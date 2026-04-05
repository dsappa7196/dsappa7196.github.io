import "chart.js/auto";
import { Chart } from "chart.js";
import { DATA, FLEET_MO } from "./hubData";
import { getMonthlySeries, getMaintSeries, getFilteredMonths } from "./hubUtils";

// ─── Color palette ───────────────────────────────────────────────
export const C = {
  navy: '#0d2240', blue: '#1a56db', teal: '#0e7490', green: '#047857',
  amber: '#b45309', red: '#be123c', text: '#374151', text3: '#9ca3af',
  border: '#e2e5ea', bg: '#f4f5f7',
  greenL: 'rgba(4,120,87,.12)', amberL: 'rgba(180,83,9,.12)',
  redL: 'rgba(190,18,60,.12)', blueL: 'rgba(26,86,219,.12)',
};

export const base = {
  responsive: true, maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0d2240', titleColor: '#e5e7eb', bodyColor: '#9ca3af',
      borderColor: 'rgba(255,255,255,.08)', borderWidth: 1, padding: 10,
      titleFont: { family: "'DM Mono', monospace", size: 10 },
      bodyFont: { family: "'DM Sans', sans-serif", size: 11 }
    }
  },
  scales: {
    x: { grid: { color: 'rgba(226,229,234,.5)' }, ticks: { color: C.text3, font: { family: "'DM Mono',monospace", size: 9 } } },
    y: { grid: { color: 'rgba(226,229,234,.5)' }, ticks: { color: C.text3, font: { family: "'DM Mono',monospace", size: 9 } } }
  }
};

// charts is a ref.current object: { [id]: Chart instance }
export function mk(charts, id, type, data, opts = {}, onBarClick = null) {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  if (charts[id]) { charts[id].destroy(); delete charts[id]; }
  const finalOpts = { ...base, ...opts };
  if (onBarClick) {
    finalOpts.onClick = (_, elements) => {
      if (elements.length > 0) onBarClick(data.labels[elements[0].index]);
    };
    canvas.style.cursor = 'pointer';
  } else {
    canvas.style.cursor = '';
  }
  charts[id] = new Chart(canvas, { type, data, options: finalOpts });
}

// Returns per-bar border color array for selected site codes
function barBorder(codes, sel) {
  if (!sel || sel.length === 0) return codes.map(() => 'transparent');
  return codes.map(c => sel.includes(c) ? 'rgba(255,255,255,.85)' : 'transparent');
}

export function barColor(val, lo, hi) {
  if (val >= hi) return C.red;
  if (val >= lo) return C.amber;
  return C.green;
}

// ─── Overview ────────────────────────────────────────────────────
export function renderOverview(charts, mi, ml, fs, activeFilters) {
  const avgAvail  = (fs.reduce((a, s) => a + s.avail, 0) / fs.length).toFixed(2);
  const totalInc  = fs.reduce((a, s) => a + s.inc, 0);
  const totalP1   = fs.reduce((a, s) => a + s.p1, 0);
  const critCount = fs.reduce((a, s) => a + s.critAssets, 0);
  const avgCSAT   = (fs.reduce((a, s) => a + s.csat, 0) / fs.length).toFixed(1);
  const varTotal  = mi.reduce((a, i) => { const ser = getMonthlySeries('variance', activeFilters); return a + (ser[i] || 0); }, 0);
  const actTotal  = mi.reduce((a, i) => { const ser = getMonthlySeries('actual', activeFilters); return a + (ser[i] || 0); }, 0);
  const budTotal  = mi.reduce((a, i) => { const ser = getMonthlySeries('budget', activeFilters); return a + (ser[i] || 0); }, 0);

  const el = id => document.getElementById(id);
  if (el('ov-avail'))  el('ov-avail').textContent  = avgAvail + '%';
  if (el('ov-inc'))    el('ov-inc').textContent     = totalInc.toLocaleString();
  if (el('ov-var'))    el('ov-var').textContent     = (varTotal >= 0 ? '+' : '') + ('$' + (Math.abs(varTotal) / 1000).toFixed(1) + 'M');
  if (el('ov-crit'))   el('ov-crit').textContent    = critCount.toLocaleString();
  if (el('ov-csat'))   el('ov-csat').textContent    = avgCSAT;

  const avail = mi.map(i => (getMonthlySeries('avail', activeFilters)[i] ?? null));
  const dt    = mi.map(i => (getMonthlySeries('downtime', activeFilters)[i] ?? null));
  mk(charts, 'c-avail-dt', 'line', {
    labels: ml,
    datasets: [
      { label: 'Availability %', data: avail, borderColor: C.green, backgroundColor: C.greenL, borderWidth: 2, tension: .35, yAxisID: 'y', pointRadius: 3, pointHoverRadius: 5, fill: true },
      { label: 'Downtime hrs',   data: dt,    borderColor: C.amber, backgroundColor: 'transparent', borderWidth: 1.5, tension: .35, yAxisID: 'y1', borderDash: [4, 3], pointRadius: 2, fill: false }
    ]
  }, {
    scales: {
      y:  { min: 99.7, max: 100.0, ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" }, callback: v => v.toFixed(2) + '%' }, grid: { color: 'rgba(226,229,234,.5)' } },
      y1: { position: 'right', ticks: { color: C.amber, font: { size: 9, family: "'DM Mono',monospace" }, callback: v => v.toLocaleString() + 'h' }, grid: { drawOnChartArea: false } },
      x:  { ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" } }, grid: { color: 'rgba(226,229,234,.5)' } }
    },
    plugins: { ...base.plugins, legend: { display: true, labels: { color: C.text, font: { size: 10, family: "'DM Sans',sans-serif" } } } }
  });

  const p1     = mi.map(i => (getMonthlySeries('p1', activeFilters)[i] ?? null));
  const incAll = mi.map(i => (getMonthlySeries('incidents', activeFilters)[i] ?? null));
  const p2     = incAll.map((v, j) => v === null ? null : Math.round((v - (p1[j] || 0)) * 0.32));
  const p3     = incAll.map((v, j) => v === null ? null : Math.round((v - (p1[j] || 0)) * 0.68));
  mk(charts, 'c-inc-trend', 'bar', {
    labels: ml,
    datasets: [
      { label: 'P1', data: p1, backgroundColor: 'rgba(190,18,60,.7)',  borderRadius: 2 },
      { label: 'P2', data: p2, backgroundColor: 'rgba(180,83,9,.55)', borderRadius: 2 },
      { label: 'P3', data: p3, backgroundColor: 'rgba(14,116,144,.45)', borderRadius: 2 },
    ]
  }, {
    plugins: { ...base.plugins, legend: { display: true, labels: { color: C.text, font: { size: 10, family: "'DM Sans',sans-serif" } } } },
    scales: {
      x: { stacked: true, ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" } }, grid: { color: 'rgba(226,229,234,.5)' } },
      y: { stacked: true, ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" } }, grid: { color: 'rgba(226,229,234,.5)' } }
    }
  });

  const variance = mi.map(i => {
    const a = getMonthlySeries('actual', activeFilters)[i] ?? null;
    const b = getMonthlySeries('budget', activeFilters)[i] ?? null;
    return (a !== null && b !== null) ? a - b : null;
  });
  mk(charts, 'c-ov-variance', 'bar', {
    labels: ml,
    datasets: [{ label: 'Variance ($K)', data: variance, backgroundColor: variance.map(v => v > 400 ? 'rgba(190,18,60,.7)' : v > 200 ? 'rgba(180,83,9,.6)' : 'rgba(14,116,144,.5)'), borderRadius: 3 }]
  }, {
    plugins: { ...base.plugins },
    scales: {
      x: { ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" } }, grid: { color: 'rgba(226,229,234,.5)' } },
      y: { ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" }, callback: v => '$' + v.toLocaleString() + 'K' }, grid: { color: 'rgba(226,229,234,.5)' } }
    }
  });

  const outages = mi.map(i => (getMonthlySeries('outages', activeFilters)[i] ?? null));
  const capUtil = mi.map(i => (getMonthlySeries('cap', activeFilters)[i] ?? null));
  mk(charts, 'c-ov-outage', 'bar', {
    labels: ml,
    datasets: [
      { type: 'bar',  label: 'Outage Events',   data: outages, backgroundColor: 'rgba(190,18,60,.55)', borderRadius: 3, yAxisID: 'y' },
      { type: 'line', label: 'Capacity Util %', data: capUtil, borderColor: C.blue, backgroundColor: 'transparent', borderWidth: 2, tension: .3, pointRadius: 3, yAxisID: 'y1' },
    ]
  }, {
    plugins: { ...base.plugins, legend: { display: true, labels: { color: C.text, font: { size: 10, family: "'DM Sans',sans-serif" } } } },
    scales: {
      y:  { ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" } }, grid: { color: 'rgba(226,229,234,.5)' }, title: { display: true, text: 'Outage Events', color: C.text3, font: { size: 9 } } },
      y1: { position: 'right', min: 65, max: 70, ticks: { color: C.blue, font: { size: 9, family: "'DM Mono',monospace" }, callback: v => v + '%' }, grid: { drawOnChartArea: false }, title: { display: true, text: 'Capacity %', color: C.blue, font: { size: 9 } } },
      x:  { ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" } }, grid: { color: 'rgba(226,229,234,.5)' } }
    }
  });

  return { avgAvail, totalInc, varTotal, critCount, avgCSAT };
}

// ─── Site Risk ───────────────────────────────────────────────────
export function renderRisk(charts, fs, onSiteClick, selectedSites) {
  const sel = selectedSites || [];
  const sorted = [...fs].sort((a, b) => b.risk - a.risk);
  const riskLabels = sorted.map(s => s.code);

  mk(charts, 'c-risk-bars', 'bar', {
    labels: riskLabels,
    datasets: [{ label: 'Risk Score', data: sorted.map(s => s.risk), backgroundColor: sorted.map(s => s.risk >= 60 ? 'rgba(190,18,60,.7)' : s.risk >= 30 ? 'rgba(180,83,9,.6)' : 'rgba(4,120,87,.6)'), borderColor: barBorder(riskLabels, sel), borderWidth: sel.length > 0 ? 2 : 0, borderRadius: 3 }]
  }, {
    indexAxis: 'y',
    plugins: { ...base.plugins },
    scales: {
      x: { min: 0, max: 100, ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" } }, grid: { color: 'rgba(226,229,234,.5)' } },
      y: { ticks: { color: C.text, font: { size: 10, family: "'DM Mono',monospace", weight: '500' } }, grid: { display: false } }
    }
  }, onSiteClick ? c => onSiteClick(c) : null);

  const dtLabels = sorted.map(s => s.code);
  mk(charts, 'c-dt-site', 'bar', {
    labels: dtLabels,
    datasets: [{ label: 'Downtime (hrs)', data: sorted.map(s => s.dt), backgroundColor: sorted.map(s => s.dt > 4000 ? 'rgba(190,18,60,.65)' : s.dt > 2500 ? 'rgba(180,83,9,.55)' : 'rgba(4,120,87,.55)'), borderColor: barBorder(dtLabels, sel), borderWidth: sel.length > 0 ? 2 : 0, borderRadius: 3 }]
  }, {
    indexAxis: 'y',
    plugins: { ...base.plugins },
    scales: {
      x: { ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" }, callback: v => v.toLocaleString() + 'h' }, grid: { color: 'rgba(226,229,234,.5)' } },
      y: { ticks: { color: C.text, font: { size: 10, family: "'DM Mono',monospace" } }, grid: { display: false } }
    }
  }, onSiteClick ? c => onSiteClick(c) : null);

  const incLabels = sorted.map(s => s.code);
  mk(charts, 'c-inc-site', 'bar', {
    labels: incLabels,
    datasets: [
      { label: 'P1', data: sorted.map(s => s.p1),                                          backgroundColor: 'rgba(190,18,60,.7)',   borderRadius: 2 },
      { label: 'P2', data: sorted.map(s => Math.round((s.inc - s.p1) * 0.32)),             backgroundColor: 'rgba(180,83,9,.55)',  borderRadius: 2 },
      { label: 'P3', data: sorted.map(s => Math.round((s.inc - s.p1) * 0.68)),             backgroundColor: 'rgba(14,116,144,.45)', borderRadius: 2 },
    ]
  }, {
    plugins: { ...base.plugins, legend: { display: true, labels: { color: C.text, font: { size: 10, family: "'DM Sans',sans-serif" } } } },
    scales: {
      x: { stacked: true, ticks: { color: C.text, font: { size: 10, family: "'DM Mono',monospace" } }, grid: { display: false } },
      y: { stacked: true, ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" } }, grid: { color: 'rgba(226,229,234,.5)' } }
    }
  }, onSiteClick ? c => onSiteClick(c) : null);

  const csatBySite = sorted.map(s => s.csat);
  const csatLabels = sorted.map(s => s.code);
  mk(charts, 'c-risk-csat', 'bar', {
    labels: csatLabels,
    datasets: [{ label: 'CSAT Score', data: csatBySite, backgroundColor: csatBySite.map(v => v < 80 ? 'rgba(190,18,60,.7)' : v < 85 ? 'rgba(180,83,9,.55)' : 'rgba(4,120,87,.6)'), borderColor: barBorder(csatLabels, sel), borderWidth: sel.length > 0 ? 2 : 0, borderRadius: 3 }]
  }, {
    plugins: { ...base.plugins },
    scales: {
      x: { ticks: { color: C.text, font: { size: 10, family: "'DM Mono',monospace" } }, grid: { display: false } },
      y: { min: 70, max: 92, ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" } }, grid: { color: 'rgba(226,229,234,.5)' } }
    }
  }, onSiteClick ? c => onSiteClick(c) : null);

  return sorted;
}

// ─── Asset Intel ─────────────────────────────────────────────────
export function renderAssets(charts, fs, onSiteClick, selectedSites) {
  const sel = selectedSites || [];
  const siteCodes = new Set(fs.map(s => s.code));
  const scale = fs.length > 0 ? fs.length / 12 : 1;

  const repairByType = [
    { type: 'Cooling',   cost: Math.round(9820 * scale) },
    { type: 'UPS',       cost: Math.round(7240 * scale) },
    { type: 'Chiller',   cost: Math.round(5910 * scale) },
    { type: 'Generator', cost: Math.round(4650 * scale) },
    { type: 'PDU',       cost: Math.round(3780 * scale) },
  ];
  mk(charts, 'c-repair-type', 'bar', {
    labels: repairByType.map(r => r.type),
    datasets: [{ label: 'Repair Cost ($K)', data: repairByType.map(r => r.cost), backgroundColor: ['rgba(190,18,60,.7)', 'rgba(180,83,9,.65)', 'rgba(180,83,9,.5)', 'rgba(14,116,144,.5)', 'rgba(26,86,219,.45)'], borderRadius: 4 }]
  }, {
    indexAxis: 'y',
    plugins: { ...base.plugins },
    scales: {
      x: { ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" }, callback: v => '$' + v.toLocaleString() + 'K' }, grid: { color: 'rgba(226,229,234,.5)' } },
      y: { ticks: { color: C.text, font: { size: 10, family: "'DM Mono',monospace" } }, grid: { display: false } }
    }
  });

  const critBySite = DATA.sites.filter(s => siteCodes.has(s.code)).map(s => ({ code: s.code, crit: s.critAssets })).sort((a, b) => b.crit - a.crit);
  const critLabels = critBySite.map(s => s.code);
  mk(charts, 'c-crit-site', 'bar', {
    labels: critLabels,
    datasets: [{ label: 'Critical Assets', data: critBySite.map(s => s.crit), backgroundColor: 'rgba(190,18,60,.55)', borderColor: barBorder(critLabels, sel), borderWidth: sel.length > 0 ? 2 : 0, borderRadius: 3 }]
  }, {
    plugins: { ...base.plugins },
    scales: {
      x: { ticks: { color: C.text, font: { size: 10, family: "'DM Mono',monospace" } }, grid: { display: false } },
      y: { ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" } }, grid: { color: 'rgba(226,229,234,.5)' } }
    }
  }, onSiteClick ? c => onSiteClick(c) : null);

  mk(charts, 'c-asset-cond', 'bar', {
    labels: DATA.assetCond.types,
    datasets: [
      { label: 'Critical', data: DATA.assetCond.critical.map(v => Math.max(1, Math.round(v * scale))), backgroundColor: 'rgba(190,18,60,.7)',   borderRadius: 2 },
      { label: 'Warning',  data: DATA.assetCond.warning.map(v => Math.max(1, Math.round(v * scale))),  backgroundColor: 'rgba(180,83,9,.55)',  borderRadius: 2 },
      { label: 'Good',     data: DATA.assetCond.good.map(v => Math.max(1, Math.round(v * scale))),     backgroundColor: 'rgba(4,120,87,.55)',  borderRadius: 2 },
    ]
  }, {
    plugins: { ...base.plugins, legend: { display: true, labels: { color: C.text, font: { size: 10, family: "'DM Sans',sans-serif" } } } },
    scales: {
      x: { stacked: true, ticks: { color: C.text, font: { size: 10, family: "'DM Mono',monospace" } }, grid: { display: false } },
      y: { stacked: true, ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" } }, grid: { color: 'rgba(226,229,234,.5)' } }
    }
  });

  const capSorted = DATA.capUtil.filter(c => siteCodes.has(c.code)).sort((a, b) => b.cap - a.cap);
  const capLabels = capSorted.map(c => c.code);
  mk(charts, 'c-cap-site', 'bar', {
    labels: capLabels,
    datasets: [{ label: 'Capacity Utilization %', data: capSorted.map(c => c.cap), backgroundColor: capSorted.map(c => c.cap > 75 ? 'rgba(180,83,9,.6)' : c.cap > 65 ? 'rgba(26,86,219,.5)' : 'rgba(4,120,87,.55)'), borderColor: barBorder(capLabels, sel), borderWidth: sel.length > 0 ? 2 : 0, borderRadius: 3 }]
  }, {
    plugins: { ...base.plugins },
    scales: {
      x: { ticks: { color: C.text, font: { size: 10, family: "'DM Mono',monospace" } }, grid: { display: false } },
      y: { min: 55, max: 80, ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" }, callback: v => v + '%' }, grid: { color: 'rgba(226,229,234,.5)' } }
    }
  }, onSiteClick ? c => onSiteClick(c) : null);
}

// ─── Finance ─────────────────────────────────────────────────────
export function renderFinance(charts, mi, ml, fs, activeFilters, onSiteClick, selectedSites) {
  const sel = selectedSites || [];
  const budget = mi.map(i => (getMonthlySeries('budget', activeFilters)[i] ?? null));
  const actual = mi.map(i => (getMonthlySeries('actual', activeFilters)[i] ?? null));

  // Scale spend-category charts by proportion of filtered spend vs full-fleet 18-month total
  const filteredActual = actual.reduce((a, v) => a + (v || 0), 0);
  const fleetActualAll = FLEET_MO.actual.reduce((a, b) => a + b, 0);
  const catScale = fleetActualAll > 0 ? filteredActual / fleetActualAll : 1;

  mk(charts, 'c-fin-trend', 'bar', {
    labels: ml,
    datasets: [
      { label: 'Budget ($K)',       data: budget, backgroundColor: 'rgba(26,86,219,.35)', borderRadius: 2 },
      { label: 'Actual Spend ($K)', data: actual, backgroundColor: 'rgba(180,83,9,.55)',  borderRadius: 2 }
    ]
  }, {
    plugins: { ...base.plugins, legend: { display: true, labels: { color: C.text, font: { size: 10, family: "'DM Sans',sans-serif" } } } },
    scales: {
      x: { ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" } }, grid: { color: 'rgba(226,229,234,.5)' } },
      y: { ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" }, callback: v => '$' + (v / 1000).toFixed(0) + 'M' }, grid: { color: 'rgba(226,229,234,.5)' } }
    }
  });

  mk(charts, 'c-spend-cat', 'bar', {
    labels: DATA.spendCats.map(s => s.cat),
    datasets: [
      { label: 'Budget', data: DATA.spendCats.map(s => Math.round(s.budget * catScale)), backgroundColor: 'rgba(26,86,219,.35)', borderRadius: 3 },
      { label: 'Actual', data: DATA.spendCats.map(s => Math.round(s.actual * catScale)), backgroundColor: 'rgba(180,83,9,.55)',  borderRadius: 3 }
    ]
  }, {
    plugins: { ...base.plugins, legend: { display: true, labels: { color: C.text, font: { size: 10, family: "'DM Sans',sans-serif" } } } },
    scales: {
      x: { ticks: { color: C.text, font: { size: 9, family: "'DM Mono',monospace" } }, grid: { display: false } },
      y: { ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" }, callback: v => '$' + (v / 1000).toFixed(0) + 'M' }, grid: { color: 'rgba(226,229,234,.5)' } }
    }
  });

  const siteCodes = new Set(fs.map(s => s.code));
  const varSites = DATA.sites.filter(s => siteCodes.has(s.code)).sort((a, b) => b.varPct - a.varPct);
  const varLabels = varSites.map(s => s.code);
  mk(charts, 'c-var-site', 'bar', {
    labels: varLabels,
    datasets: [{ label: 'Variance %', data: varSites.map(s => s.varPct), backgroundColor: varSites.map(s => s.varPct > 4 ? 'rgba(190,18,60,.65)' : s.varPct > 2 ? 'rgba(180,83,9,.55)' : 'rgba(4,120,87,.55)'), borderColor: barBorder(varLabels, sel), borderWidth: sel.length > 0 ? 2 : 0, borderRadius: 3 }]
  }, {
    indexAxis: 'y',
    plugins: { ...base.plugins },
    scales: {
      x: { min: 0, max: 7, ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" }, callback: v => '+' + v + '%' }, grid: { color: 'rgba(226,229,234,.5)' } },
      y: { ticks: { color: C.text, font: { size: 10, family: "'DM Mono',monospace" } }, grid: { display: false } }
    }
  }, onSiteClick ? c => onSiteClick(c) : null);

  mk(charts, 'c-var-cat', 'bar', {
    labels: DATA.spendCats.map(s => s.cat),
    datasets: [{
      label: 'Variance $K',
      data: DATA.spendCats.map(s => Math.round((s.actual - s.budget) * catScale)),
      backgroundColor: DATA.spendCats.map(s => (s.actual - s.budget) > 1000 ? 'rgba(190,18,60,.65)' : 'rgba(180,83,9,.55)'),
      borderRadius: 3
    }]
  }, {
    plugins: { ...base.plugins },
    scales: {
      x: { ticks: { color: C.text, font: { size: 9, family: "'DM Mono',monospace" } }, grid: { display: false } },
      y: { ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" }, callback: v => '$' + v.toLocaleString() + 'K' }, grid: { color: 'rgba(226,229,234,.5)' } }
    }
  });

  return { varSites };
}

// ─── Maintenance ─────────────────────────────────────────────────
export function renderMaintenance(charts, fs, activeFilters, onSiteClick, selectedSites) {
  const sel = selectedSites || [];
  const scale = fs.length > 0 ? fs.length / 12 : 1;
  mk(charts, 'c-maint-pareto', 'bar', {
    labels: DATA.failPareto.map(f => f.cat),
    datasets: [{ label: 'Repair Cost ($K)', data: DATA.failPareto.map(f => Math.round(f.cost * scale)), backgroundColor: ['rgba(190,18,60,.7)', 'rgba(180,83,9,.65)', 'rgba(180,83,9,.55)', 'rgba(180,83,9,.45)', 'rgba(14,116,144,.5)', 'rgba(14,116,144,.45)', 'rgba(26,86,219,.45)', 'rgba(26,86,219,.35)'], borderRadius: 3 }]
  }, {
    indexAxis: 'y',
    plugins: { ...base.plugins },
    scales: {
      x: { ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" }, callback: v => '$' + v.toLocaleString() + 'K' }, grid: { color: 'rgba(226,229,234,.5)' } },
      y: { ticks: { color: C.text, font: { size: 10, family: "'DM Mono',monospace" } }, grid: { display: false } }
    }
  });

  const sorted = [...fs].sort((a, b) => b.slaB - a.slaB);
  const slaCounts = sorted.map(s => Math.round(s.wos * s.slaB / 100));
  const slaLabels = sorted.map(s => s.code);
  mk(charts, 'c-sla-breach', 'bar', {
    labels: slaLabels,
    datasets: [{ label: 'SLA Breach Count', data: slaCounts, backgroundColor: sorted.map(s => s.slaB > 45 ? 'rgba(190,18,60,.7)' : s.slaB > 35 ? 'rgba(180,83,9,.6)' : 'rgba(14,116,144,.5)'), borderColor: barBorder(slaLabels, sel), borderWidth: sel.length > 0 ? 2 : 0, borderRadius: 3 }]
  }, {
    plugins: { ...base.plugins },
    scales: {
      x: { ticks: { color: C.text, font: { size: 10, family: "'DM Mono',monospace" } }, grid: { display: false } },
      y: { ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" } }, grid: { color: 'rgba(226,229,234,.5)' } }
    }
  }, onSiteClick ? c => onSiteClick(c) : null);

  const totalWO   = fs.reduce((a, s) => a + s.wos, 0);
  const corrTotal = fs.reduce((a, s) => a + Math.round(s.wos * s.corrRatio / 100), 0);
  mk(charts, 'c-prev-corr', 'doughnut', {
    labels: ['Corrective', 'Preventive'],
    datasets: [{ data: [corrTotal, totalWO - corrTotal], backgroundColor: ['rgba(190,18,60,.7)', 'rgba(26,86,219,.55)'], borderWidth: 0, hoverOffset: 4 }]
  }, {
    plugins: { ...base.plugins, legend: { display: true, position: 'bottom', labels: { color: C.text, font: { size: 11, family: "'DM Sans',sans-serif" }, padding: 14, usePointStyle: true, pointStyleWidth: 10 } } },
    cutout: '65%',
    scales: { x: { display: false }, y: { display: false } }
  });

  const corrLabels = sorted.map(s => s.code);
  mk(charts, 'c-corr-site', 'bar', {
    labels: corrLabels,
    datasets: [{ label: 'Corrective Ratio %', data: sorted.map(s => s.corrRatio), backgroundColor: sorted.map(s => s.corrRatio > 62 ? 'rgba(190,18,60,.65)' : s.corrRatio > 58 ? 'rgba(180,83,9,.6)' : 'rgba(26,86,219,.5)'), borderColor: barBorder(corrLabels, sel), borderWidth: sel.length > 0 ? 2 : 0, borderRadius: 3 }]
  }, {
    plugins: { ...base.plugins },
    scales: {
      x: { ticks: { color: C.text, font: { size: 10, family: "'DM Mono',monospace" } }, grid: { display: false } },
      y: { min: 50, max: 70, ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" }, callback: v => v + '%' }, grid: { color: 'rgba(226,229,234,.5)' } }
    }
  }, onSiteClick ? c => onSiteClick(c) : null);

  const fm = getFilteredMonths(activeFilters);
  const mi = fm.map(x => x.i);
  const ml = fm.map(x => x.m);
  mk(charts, 'c-wo-trend', 'bar', {
    labels: ml,
    datasets: [
      { label: 'Total WOs',    data: mi.map(i => (getMaintSeries('wos', activeFilters)[i] ?? null)),    backgroundColor: 'rgba(26,86,219,.35)', borderRadius: 2 },
      { label: 'SLA Breaches', data: mi.map(i => (getMaintSeries('breach', activeFilters)[i] ?? null)), backgroundColor: 'rgba(190,18,60,.6)',  borderRadius: 2 },
    ]
  }, {
    plugins: { ...base.plugins, legend: { display: true, labels: { color: C.text, font: { size: 10, family: "'DM Sans',sans-serif" } } } },
    scales: {
      x: { ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" } }, grid: { color: 'rgba(226,229,234,.5)' } },
      y: { ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" } }, grid: { color: 'rgba(226,229,234,.5)' } }
    }
  });

  const siteCodes = new Set(fs.map(s => s.code));
  const rtSorted = DATA.respTime.filter(r => siteCodes.has(r.code)).sort((a, b) => b.resp - a.resp);
  const rtLabels = rtSorted.map(r => r.code);
  mk(charts, 'c-resp-time', 'bar', {
    labels: rtLabels,
    datasets: [{ label: 'Avg Response Time (hrs)', data: rtSorted.map(r => r.resp), backgroundColor: rtSorted.map(r => r.resp > 4.5 ? 'rgba(190,18,60,.65)' : r.resp > 4.0 ? 'rgba(180,83,9,.6)' : 'rgba(4,120,87,.55)'), borderColor: barBorder(rtLabels, sel), borderWidth: sel.length > 0 ? 2 : 0, borderRadius: 3 }]
  }, {
    plugins: { ...base.plugins },
    scales: {
      x: { ticks: { color: C.text, font: { size: 10, family: "'DM Mono',monospace" } }, grid: { display: false } },
      y: { min: 3, max: 5.5, ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" }, callback: v => v + 'h' }, grid: { color: 'rgba(226,229,234,.5)' } }
    }
  }, onSiteClick ? c => onSiteClick(c) : null);

  return { sorted, rtSorted };
}

// ─── Customer ────────────────────────────────────────────────────
export function renderCustomer(charts, mi, ml, fs, activeFilters, onSiteClick, selectedSites) {
  const sel = selectedSites || [];
  const csat = mi.map(i => (getMonthlySeries('csat', activeFilters)[i] ?? null));
  const nps  = mi.map(i => (FLEET_MO['nps'] ? FLEET_MO['nps'][i] : null) ?? null);

  mk(charts, 'c-csat-trend', 'line', {
    labels: ml,
    datasets: [
      { label: 'CSAT', data: csat, borderColor: C.blue, backgroundColor: C.blueL, borderWidth: 2, tension: .35, fill: true, pointRadius: 3, yAxisID: 'y' },
      { label: 'NPS',  data: nps,  borderColor: C.teal, backgroundColor: 'transparent', borderWidth: 1.5, tension: .35, fill: false, borderDash: [4, 3], pointRadius: 2, yAxisID: 'y1' }
    ]
  }, {
    plugins: { ...base.plugins, legend: { display: true, labels: { color: C.text, font: { size: 10, family: "'DM Sans',sans-serif" } } } },
    scales: {
      y:  { min: 78, max: 88, ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" } }, grid: { color: 'rgba(226,229,234,.5)' } },
      y1: { position: 'right', min: 38, max: 50, ticks: { color: C.teal, font: { size: 9, family: "'DM Mono',monospace" } }, grid: { drawOnChartArea: false } },
      x:  { ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" } }, grid: { color: 'rgba(226,229,234,.5)' } }
    }
  });

  const siteCodes = new Set(fs.map(s => s.code));
  const sortedCsat = [...fs].sort((a, b) => b.csat - a.csat);
  const csatSiteLabels = sortedCsat.map(s => s.code);
  mk(charts, 'c-csat-site', 'bar', {
    labels: csatSiteLabels,
    datasets: [{ label: 'CSAT Score', data: sortedCsat.map(s => s.csat), backgroundColor: sortedCsat.map(s => s.csat < 80 ? 'rgba(190,18,60,.7)' : s.csat < 85 ? 'rgba(180,83,9,.55)' : 'rgba(4,120,87,.6)'), borderColor: barBorder(csatSiteLabels, sel), borderWidth: sel.length > 0 ? 2 : 0, borderRadius: 3 }]
  }, {
    plugins: { ...base.plugins },
    scales: {
      x: { ticks: { color: C.text, font: { size: 10, family: "'DM Mono',monospace" } }, grid: { display: false } },
      y: { min: 70, max: 93, ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" } }, grid: { color: 'rgba(226,229,234,.5)' } }
    }
  }, onSiteClick ? c => onSiteClick(c) : null);

  const caData = DATA.csatAvail.filter(d => siteCodes.has(d.code)).sort((a, b) => a.avail - b.avail);
  mk(charts, 'c-csat-avail', 'scatter', {
    datasets: [{
      label: 'Site CSAT vs Availability',
      data: caData.map(d => ({ x: d.avail, y: d.csat, label: d.code })),
      backgroundColor: caData.map(d => d.csat < 80 ? 'rgba(190,18,60,.7)' : d.csat < 85 ? 'rgba(180,83,9,.6)' : 'rgba(4,120,87,.6)'),
      pointRadius: 7, pointHoverRadius: 10
    }]
  }, {
    plugins: {
      ...base.plugins,
      tooltip: { ...base.plugins.tooltip, callbacks: { label: (ctx) => { const d = caData[ctx.dataIndex]; return `${d.code}: CSAT ${d.csat} · Avail ${d.avail.toFixed(3)}%`; } } }
    },
    scales: {
      x: { min: 99.65, max: 99.87, ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" }, callback: v => v.toFixed(2) + '%' }, grid: { color: 'rgba(226,229,234,.5)' }, title: { display: true, text: 'Availability %', color: C.text3, font: { size: 9 } } },
      y: { min: 72, max: 92, ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" } }, grid: { color: 'rgba(226,229,234,.5)' }, title: { display: true, text: 'CSAT Score', color: C.text3, font: { size: 9 } } }
    }
  });

  mk(charts, 'c-installed', 'line', {
    labels: ml,
    datasets: [{
      label: 'Installed Customers',
      data: mi.map(i => (FLEET_MO['customers'] ? FLEET_MO['customers'][i] : DATA.installed.customers[i]) ?? null),
      borderColor: C.teal, backgroundColor: 'rgba(14,116,144,.1)', borderWidth: 2, tension: .3, fill: true, pointRadius: 3
    }]
  }, {
    plugins: { ...base.plugins },
    scales: {
      x: { ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" } }, grid: { color: 'rgba(226,229,234,.5)' } },
      y: { min: 950, max: 1120, ticks: { color: C.text3, font: { size: 9, family: "'DM Mono',monospace" } }, grid: { color: 'rgba(226,229,234,.5)' } }
    }
  });

  return { sortedCsat, caData };
}
