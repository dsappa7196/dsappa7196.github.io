import { useEffect, useRef } from "react";
import { getFilteredSites } from "../hubUtils";
import { renderMaintenance } from "../hubCharts";
import { DATA } from "../hubData";

export default function PageMaintenance({ activeFilters, showToast, onSiteClick, activeSites }) {
  const chartsRef = useRef({});

  useEffect(() => {
    const fs = getFilteredSites(activeFilters);
    renderMaintenance(chartsRef.current, fs, activeFilters, onSiteClick, activeSites);
    return () => {
      Object.values(chartsRef.current).forEach(c => c.destroy());
      chartsRef.current = {};
    };
  }, [activeFilters, onSiteClick, activeSites]);

  const fs = getFilteredSites(activeFilters);
  const sorted = [...fs].sort((a, b) => b.slaB - a.slaB);
  const rt = Object.fromEntries(DATA.respTime.map(r => [r.code, r]));

  const siteCodes    = new Set(fs.map(s => s.code));
  const totalWOs     = fs.reduce((a, s) => a + s.wos, 0);
  const totalBreaches = fs.reduce((a, s) => a + Math.round(s.wos * s.slaB / 100), 0);
  const breachRate   = totalWOs > 0 ? ((totalBreaches / totalWOs) * 100).toFixed(1) : '0.0';
  const avgCorrRatio = fs.length > 0 ? (fs.reduce((a, s) => a + s.corrRatio, 0) / fs.length).toFixed(1) : '0.0';
  const repairCostM  = (31.4 * (fs.length > 0 ? fs.length / 12 : 1)).toFixed(1);
  const totalRepeat  = DATA.respTime.filter(r => siteCodes.has(r.code)).reduce((a, r) => a + r.repeat, 0);

  return (
    <>
      <div className="action-bar">
        <span className="ab-label">Actions:</span>
        <button className="act-btn ab-red"     onClick={() => showToast("SLA breach review created · WOs flagged for audit", "amber")}>Review SLA Breaches</button>
        <button className="act-btn ab-amber"   onClick={() => showToast("PM improvement plan sent to high corrective-ratio sites", "amber")}>PM Improvement Plan</button>
        <button className="act-btn ab-neutral" onClick={() => showToast("Maintenance analytics report exported", "blue")}>Export Report</button>
        <button className="act-btn ab-teal"    onClick={() => showToast("Vendor performance summary generated for top 5 vendors", "blue")}>Vendor Summary</button>
        <div className="ab-sep"></div>
        <span className="ab-ctx">{breachRate}% SLA breach rate · {avgCorrRatio}% corrective ratio</span>
      </div>
      <div className="kpi-row">
        <div className="kpi-card blue"><div className="kpi-label">Total Work Orders</div><div className="kpi-val blue">{totalWOs.toLocaleString()}</div><div className="kpi-sub">{fs.length} site{fs.length !== 1 ? 's' : ''} selected</div></div>
        <div className="kpi-card red"><div className="kpi-label">SLA Breach Count</div><div className="kpi-val red">{totalBreaches.toLocaleString()}</div><div className="kpi-sub crit">{breachRate}% breach rate vs 15% target</div></div>
        <div className="kpi-card amber"><div className="kpi-label">Corrective Ratio</div><div className="kpi-val amber">{avgCorrRatio}%</div><div className="kpi-sub warn">Target ≤40% corrective</div></div>
        <div className="kpi-card amber"><div className="kpi-label">Total Repair Cost</div><div className="kpi-val amber">${repairCostM}M</div><div className="kpi-sub warn">Estimated total</div></div>
        <div className="kpi-card red"><div className="kpi-label">Repeat Failures</div><div className="kpi-val red">{totalRepeat.toLocaleString()}</div><div className="kpi-sub crit">Same asset recurring failures</div></div>
      </div>
      <div className="g2">
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">Top Failure Categories — Repair Cost</div><div className="cc-sub">Pareto view · fleet-wide</div></div><div className="cc-badge cb-amber">Routine Wear preventable</div></div>
          <div className="cc-body"><canvas id="c-maint-pareto" height="240"></canvas></div>
        </div>
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">SLA Breach Count by Site</div><div className="cc-sub">Total work orders breaching SLA</div></div><div className="cc-badge cb-red">DAL01: 458 breaches</div></div>
          <div className="cc-body"><canvas id="c-sla-breach" height="240"></canvas></div>
          <div className="chart-click-hint">Click any bar to filter · Click again to clear</div>
        </div>
      </div>
      <div className="g2">
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">Preventive vs Corrective Split</div><div className="cc-sub">Fleet-wide distribution</div></div></div>
          <div className="cc-body"><canvas id="c-prev-corr" height="180"></canvas></div>
        </div>
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">Corrective Ratio by Site</div><div className="cc-sub">Higher = more reactive operations</div></div></div>
          <div className="cc-body"><canvas id="c-corr-site" height="180"></canvas></div>
          <div className="chart-click-hint">Click any bar to filter · Click again to clear</div>
        </div>
      </div>
      <div className="g2">
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">Monthly Work Order Volume</div><div className="cc-sub">Total WOs + SLA breaches per month</div></div><div className="cc-badge cb-amber">Breaches trending flat</div></div>
          <div className="cc-body"><canvas id="c-wo-trend" height="180"></canvas></div>
        </div>
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">Avg Response Time by Site</div><div className="cc-sub">Hours to first response · lower is better</div></div><div className="cc-badge cb-red">LAX01: 4.71h worst</div></div>
          <div className="cc-body"><canvas id="c-resp-time" height="180"></canvas></div>
          <div className="chart-click-hint">Click any bar to filter · Click again to clear</div>
        </div>
      </div>
      <div className="sec-label">Site Maintenance Detail</div>
      <div className="chart-card">
        <table className="data-table" id="t-maint-site">
          <thead>
            <tr><th>Site</th><th>City</th><th>Total WOs</th><th>SLA Breaches</th><th>SLA Breach %</th><th>Corrective %</th><th>Repeat Failures</th><th>Avg Response</th><th>Status</th></tr>
          </thead>
          <tbody>
            {sorted.map(s => {
              const breachCount = Math.round(s.wos * s.slaB / 100);
              const rtData = rt[s.code] || {};
              const st = s.slaB > 45 ? 'pill-red' : s.slaB > 35 ? 'pill-amber' : 'pill-green';
              const sl = s.slaB > 45 ? 'High Risk' : s.slaB > 35 ? 'Watch' : 'Normal';
              return (
                <tr key={s.code}>
                  <td><strong>{s.code}</strong></td>
                  <td>{s.city}</td>
                  <td style={{ fontFamily: 'var(--mono)' }}>{s.wos.toLocaleString()}</td>
                  <td style={{ fontFamily: 'var(--mono)', color: breachCount > 200 ? 'var(--red)' : 'inherit' }}>{breachCount.toLocaleString()}</td>
                  <td style={{ fontFamily: 'var(--mono)', color: s.slaB > 45 ? 'var(--red)' : s.slaB > 35 ? 'var(--amber)' : 'var(--green)' }}>{s.slaB}%</td>
                  <td style={{ fontFamily: 'var(--mono)', color: s.corrRatio > 62 ? 'var(--amber)' : 'inherit' }}>{s.corrRatio}%</td>
                  <td style={{ fontFamily: 'var(--mono)' }}>{rtData.repeat || '—'}</td>
                  <td style={{ fontFamily: 'var(--mono)' }}>{rtData.resp ? rtData.resp + 'h' : '—'}</td>
                  <td><span className={`pill ${st}`}>{sl}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
