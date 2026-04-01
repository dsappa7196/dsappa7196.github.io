import { useEffect, useRef } from "react";
import { getFilteredSites } from "../hubUtils";
import { renderRisk } from "../hubCharts";

export default function PageRisk({ activeFilters, showToast }) {
  const chartsRef = useRef({});

  useEffect(() => {
    const fs = getFilteredSites(activeFilters);
    const sorted = renderRisk(chartsRef.current, fs);
    return () => {
      Object.values(chartsRef.current).forEach(c => c.destroy());
      chartsRef.current = {};
    };
  }, [activeFilters]);

  const fs = getFilteredSites(activeFilters);
  const sorted = [...fs].sort((a, b) => b.risk - a.risk);

  return (
    <>
      <div className="action-bar">
        <span className="ab-label">Actions:</span>
        <button className="act-btn ab-red"     onClick={() => showToast("DAL01 escalation report submitted to operations leadership", "amber")}>Escalate DAL01</button>
        <button className="act-btn ab-amber"   onClick={() => showToast("PM improvement plan created for DAL01 · ATL01 · SJC01", "amber")}>PM Improvement Plan</button>
        <button className="act-btn ab-neutral" onClick={() => showToast("Site risk report exported · All 12 sites included", "blue")}>Export Scorecard</button>
        <button className="act-btn ab-blue"    onClick={() => showToast("Risk summary copied for leadership briefing", "blue")}>Copy Summary</button>
        <div className="ab-sep"></div>
        <span className="ab-ctx">3 Critical · 6 Warning · 3 Normal</span>
      </div>
      <div className="kpi-row">
        <div className="kpi-card red"><div className="kpi-label">Highest Risk Site</div><div className="kpi-val red">DAL01</div><div className="kpi-sub crit">Score 81.6 / 100</div></div>
        <div className="kpi-card amber"><div className="kpi-label">Sites in Warning</div><div className="kpi-val amber">3</div><div className="kpi-sub warn">DAL01, ASH01, SJC01</div></div>
        <div className="kpi-card green"><div className="kpi-label">Sites in Normal</div><div className="kpi-val green">9</div><div className="kpi-sub ok">PHX01, DEN01, MIA01 best</div></div>
        <div className="kpi-card amber"><div className="kpi-label">Fleet Downtime</div><div className="kpi-val amber">41,297h</div><div className="kpi-sub warn">DAL01: 5,945h (14.4%)</div></div>
        <div className="kpi-card red"><div className="kpi-label">Fleet P1 Incidents</div><div className="kpi-val red">584</div><div className="kpi-sub crit">Across 18 months</div></div>
      </div>
      <div className="g2">
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">Composite Risk Score — All Sites</div><div className="cc-sub">Weighted: Avail(25%) + Incidents(20%) + Downtime(20%) + SLA(20%) + Variance(15%)</div></div><div className="cc-badge cb-red">DAL01 critical</div></div>
          <div className="cc-body"><canvas id="c-risk-bars" height="260"></canvas></div>
        </div>
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">Total Downtime by Site</div><div className="cc-sub">18-month cumulative hours</div></div><div className="cc-badge cb-red">DAL01: 5,945h</div></div>
          <div className="cc-body"><canvas id="c-dt-site" height="260"></canvas></div>
        </div>
      </div>
      <div className="g2">
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">Incident Count by Site — P1 / P2 / P3</div><div className="cc-sub">18-month total per location · stacked by severity</div></div><div className="cc-badge cb-red">DAL01: 1,009 total</div></div>
          <div className="cc-body"><canvas id="c-inc-site" height="200"></canvas></div>
        </div>
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">Customer Satisfaction (CSAT) by Site</div><div className="cc-sub">18-month average · operational risk directly impacts customer experience · target ≥85</div></div><div className="cc-badge cb-red">DAL01: 74.9 — 10pts below target</div></div>
          <div className="cc-body"><canvas id="c-risk-csat" height="200"></canvas></div>
        </div>
      </div>
      <div className="sec-label">Full Site Scorecard</div>
      <div className="chart-card">
        <table className="data-table" id="t-site-scorecard">
          <thead>
            <tr><th>#</th><th>Site</th><th>City</th><th>Risk Score</th><th>Avail %</th><th>P1 Inc</th><th>Downtime</th><th>Var %</th><th>SLA Breach%</th><th>Corr Ratio%</th><th>CSAT</th><th>Status</th></tr>
          </thead>
          <tbody>
            {sorted.map((s, i) => {
              const st = s.risk >= 60 ? 'pill-red' : s.risk >= 30 ? 'pill-amber' : 'pill-green';
              const sl = s.risk >= 60 ? 'Critical' : s.risk >= 30 ? 'Warning' : 'Normal';
              return (
                <tr key={s.code}>
                  <td style={{ color: 'var(--text4)', fontFamily: 'var(--mono)' }}>{i + 1}</td>
                  <td><strong>{s.code}</strong></td>
                  <td>{s.city}</td>
                  <td style={{ fontFamily: 'var(--mono)', fontWeight: 600, color: s.risk >= 60 ? 'var(--red)' : s.risk >= 30 ? 'var(--amber)' : 'var(--green)' }}>{s.risk}</td>
                  <td>{s.avail.toFixed(3)}%</td>
                  <td>{s.p1}</td>
                  <td>{s.dt.toLocaleString()}h</td>
                  <td style={{ color: s.varPct > 4 ? 'var(--amber)' : 'inherit' }}>{s.varPct}%</td>
                  <td style={{ color: s.slaB > 40 ? 'var(--red)' : 'inherit' }}>{s.slaB}%</td>
                  <td style={{ color: s.corrRatio > 60 ? 'var(--amber)' : 'inherit' }}>{s.corrRatio}%</td>
                  <td style={{ color: s.csat < 80 ? 'var(--red)' : s.csat < 85 ? 'var(--amber)' : 'var(--green)' }}>{s.csat}</td>
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
