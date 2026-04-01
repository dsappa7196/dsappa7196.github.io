import { useEffect, useRef } from "react";
import { getFilteredMonths, getFilteredSites } from "../hubUtils";
import { renderOverview } from "../hubCharts";
import { DATA } from "../hubData";

export default function PageOverview({ activeFilters, onNav, showToast }) {
  const chartsRef = useRef({});

  useEffect(() => {
    const fm = getFilteredMonths(activeFilters);
    const fs = getFilteredSites(activeFilters);
    const mi = fm.map(x => x.i);
    const ml = fm.map(x => x.m);
    renderOverview(chartsRef.current, mi, ml, fs, activeFilters);
    return () => {
      Object.values(chartsRef.current).forEach(c => c.destroy());
      chartsRef.current = {};
    };
  }, [activeFilters]);

  const fs = getFilteredSites(activeFilters);

  return (
    <>
      <div className="alert-strip" onClick={() => onNav('risk')}>
        <div className="alert-dot"></div>
        <div className="alert-text"><strong>Action Required — DAL01 (Dallas):</strong> Risk score 81.6/100. Availability 99.678% vs 99.9% SLA target. 5,945 hrs downtime. CSAT 74.9 — lowest in fleet.</div>
        <button className="alert-btn">Drill into DAL01 →</button>
      </div>
      <div className="action-bar">
        <span className="ab-label">Actions:</span>
        <button className="act-btn ab-red"     onClick={() => showToast('Escalation ticket created for DAL01 · Ops team notified', 'amber')}>Escalate DAL01</button>
        <button className="act-btn ab-amber"   onClick={() => onNav('assets')}>Asset Review</button>
        <button className="act-btn ab-neutral" onClick={() => showToast('Executive summary report exported · PDF ready', 'blue')}>Export Report</button>
        <button className="act-btn ab-neutral" onClick={() => showToast('Dashboard link copied to clipboard', 'blue')}>Share Link</button>
        <div className="ab-sep"></div>
        <span className="ab-ctx" id="ov-ab-ctx">Fleet view · No filter active</span>
      </div>
      <div className="kpi-row">
        <div className="kpi-card green"><div className="kpi-label">Fleet Availability</div><div className="kpi-val green" id="ov-avail">99.78%</div><div className="kpi-sub warn">↓ Below 99.9% SLA target</div></div>
        <div className="kpi-card red"><div className="kpi-label">Total Incidents</div><div className="kpi-val red" id="ov-inc">9,099</div><div className="kpi-sub crit">584 P1 · 750 outage events</div></div>
        <div className="kpi-card amber"><div className="kpi-label">Budget Variance</div><div className="kpi-val amber" id="ov-var">+$5.4M</div><div className="kpi-sub warn">Over budget · all 18 months</div></div>
        <div className="kpi-card red"><div className="kpi-label">Critical Assets</div><div className="kpi-val red" id="ov-crit">211</div><div className="kpi-sub crit">107 flagged for replacement</div></div>
        <div className="kpi-card teal"><div className="kpi-label">Fleet CSAT</div><div className="kpi-val blue" id="ov-csat">83.5</div><div className="kpi-sub warn">Below 85 target · DAL01: 74.9</div></div>
      </div>
      <div className="dec-row">
        <div className="dec-card crit" onClick={() => onNav('risk')}>
          <div className="dec-tag">● Decision 1 — Site Risk</div>
          <div className="dec-title">DAL01 requires immediate escalation</div>
          <div className="dec-body"><strong>What:</strong> Risk 81.6/100 — highest in fleet. <strong>Why:</strong> 61.7% corrective ratio + 458 SLA breaches + 5,945 hrs downtime. <strong>Action:</strong> Ops review + increase PM frequency.</div>
          <span className="dec-link">→ Open Site Risk with DAL01 drill-down</span>
        </div>
        <div className="dec-card warn" onClick={() => onNav('assets')}>
          <div className="dec-tag">● Decision 2 — Asset Intelligence</div>
          <div className="dec-title">107 Cooling assets past cost-efficiency threshold</div>
          <div className="dec-body"><strong>What:</strong> 107 assets flagged; top 10 at condition score 25/100. <strong>Why:</strong> Cooling avg age 8.6 yr at 10-yr life. <strong>Action:</strong> Initiate replacement review for top 10 candidates.</div>
          <span className="dec-link">→ Open Asset Intelligence view</span>
        </div>
        <div className="dec-card warn" onClick={() => onNav('finance')}>
          <div className="dec-tag">● Decision 3 — Spend Deviation</div>
          <div className="dec-title">Structural overspend — every month, every category</div>
          <div className="dec-body"><strong>What:</strong> +$5.4M over 18 months. <strong>Why:</strong> Corrective WOs cost 15–25% more than PM; DAL01 alone $957K variance. <strong>Action:</strong> Shift PM ratio to ≥50% at DAL01/ATL01/CHI01.</div>
          <span className="dec-link">→ Open Finance &amp; Spend view</span>
        </div>
      </div>
      <div className="g2">
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">Availability &amp; Downtime Trend</div><div className="cc-sub">Monthly fleet average</div></div><div className="cc-badge cb-amber">0.12pts below SLA</div></div>
          <div className="cc-body"><canvas id="c-avail-dt" height="180"></canvas></div>
        </div>
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">Incident Volume — P1 / P2 / P3</div><div className="cc-sub">Monthly breakdown</div></div><div className="cc-badge cb-red">Peak Aug 2024</div></div>
          <div className="cc-body"><canvas id="c-inc-trend" height="180"></canvas></div>
        </div>
      </div>
      <div className="g2">
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">Monthly Budget Variance — Fleet</div><div className="cc-sub">Overspend $ per month · every month above zero is over budget</div></div><div className="cc-badge cb-red">All 18 months over budget</div></div>
          <div className="cc-body"><canvas id="c-ov-variance" height="180"></canvas></div>
        </div>
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">Outage Events &amp; Capacity Utilization</div><div className="cc-sub">Outage count (bars) vs avg capacity util % (line) · higher utilization correlates with more outages</div></div><div className="cc-badge cb-amber">Jun–Oct 2024 peak</div></div>
          <div className="cc-body"><canvas id="c-ov-outage" height="180"></canvas></div>
        </div>
      </div>
      <div className="sec-label">Site Risk Summary</div>
      <div className="chart-card">
        <table className="data-table" id="t-site-summary">
          <thead><tr><th>Site</th><th>City</th><th>Region</th><th>Risk Score</th><th>Availability</th><th>Incidents</th><th>Downtime (h)</th><th>CSAT</th><th>Status</th></tr></thead>
          <tbody>
            {fs.map(s => {
              const st = s.risk >= 60 ? 'pill-red' : s.risk >= 30 ? 'pill-amber' : 'pill-green';
              const sl = s.risk >= 60 ? 'Critical' : s.risk >= 30 ? 'Warning' : 'Normal';
              return (
                <tr key={s.code} onClick={() => onNav('risk')} style={{ cursor: 'pointer' }}>
                  <td><strong>{s.code}</strong></td>
                  <td>{s.city}</td>
                  <td>{s.region}</td>
                  <td><strong>{s.risk}</strong></td>
                  <td>{s.avail.toFixed(3)}%</td>
                  <td>{s.inc.toLocaleString()}</td>
                  <td>{s.dt.toLocaleString()}</td>
                  <td>{s.csat}</td>
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
