import { useEffect, useRef } from "react";
import { getFilteredMonths, getFilteredSites } from "../hubUtils";
import { renderCustomer } from "../hubCharts";
import { DATA } from "../hubData";

export default function PageCustomer({ activeFilters, showToast }) {
  const chartsRef = useRef({});

  useEffect(() => {
    const fm = getFilteredMonths(activeFilters);
    const fs = getFilteredSites(activeFilters);
    const mi = fm.map(x => x.i);
    const ml = fm.map(x => x.m);
    renderCustomer(chartsRef.current, mi, ml, fs, activeFilters);
    return () => {
      Object.values(chartsRef.current).forEach(c => c.destroy());
      chartsRef.current = {};
    };
  }, [activeFilters]);

  const fs = getFilteredSites(activeFilters);
  const sortedCsat = [...fs].sort((a, b) => b.csat - a.csat);

  return (
    <>
      <div className="action-bar">
        <span className="ab-label">Actions:</span>
        <button className="act-btn ab-red"     onClick={() => showToast("DAL01 customer experience escalation report created", "amber")}>DAL01 CSAT Escalation</button>
        <button className="act-btn ab-amber"   onClick={() => showToast("Customer satisfaction improvement plan drafted for bottom 3 sites", "amber")}>Improvement Plan</button>
        <button className="act-btn ab-neutral" onClick={() => showToast("Customer experience report exported · All sites · 18 months", "blue")}>Export Report</button>
        <button className="act-btn ab-teal"    onClick={() => showToast("NPS analysis summary generated for leadership briefing", "blue")}>NPS Summary</button>
        <div className="ab-sep"></div>
        <span className="ab-ctx">Fleet avg 83.5 · Target 85 · 3 sites meeting target</span>
      </div>
      <div className="kpi-row">
        <div className="kpi-card amber"><div className="kpi-label">Fleet Avg CSAT</div><div className="kpi-val amber">83.5</div><div className="kpi-sub warn">Below 85 target</div></div>
        <div className="kpi-card blue"><div className="kpi-label">Fleet Avg NPS</div><div className="kpi-val blue">43.4</div><div className="kpi-sub warn">Below 50 target</div></div>
        <div className="kpi-card red"><div className="kpi-label">Lowest CSAT Site</div><div className="kpi-val red">74.9</div><div className="kpi-sub crit">DAL01 — 10.1pts below target</div></div>
        <div className="kpi-card green"><div className="kpi-label">Best CSAT Site</div><div className="kpi-val green">89.1</div><div className="kpi-sub ok">DEN01 — exceeds target</div></div>
        <div className="kpi-card green"><div className="kpi-label">Sites Meeting Target</div><div className="kpi-val green">3</div><div className="kpi-sub ok">DEN01, MIA01, PHX01</div></div>
      </div>
      <div className="g2">
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">CSAT &amp; NPS Monthly Trend</div><div className="cc-sub">Fleet average · Jan 2024 – Jun 2025</div></div><div className="cc-badge cb-amber">Below 85 target</div></div>
          <div className="cc-body"><canvas id="c-csat-trend" height="200"></canvas></div>
        </div>
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">CSAT Score by Site</div><div className="cc-sub">18-month average per location</div></div><div className="cc-badge cb-red">DAL01: 74.9</div></div>
          <div className="cc-body"><canvas id="c-csat-site" height="200"></canvas></div>
        </div>
      </div>
      <div className="g2">
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">CSAT vs Availability Correlation</div><div className="cc-sub">By site — higher availability = higher satisfaction</div></div><div className="cc-badge cb-blue">Strong correlation</div></div>
          <div className="cc-body"><canvas id="c-csat-avail" height="200"></canvas></div>
        </div>
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">Installed Customer Base — Monthly</div><div className="cc-sub">Total installed customers across fleet</div></div><div className="cc-badge cb-green">+9.2% growth 2024→2025</div></div>
          <div className="cc-body"><canvas id="c-installed" height="200"></canvas></div>
        </div>
      </div>
      <div className="sec-label">Customer Experience — Site Detail</div>
      <div className="chart-card">
        <table className="data-table" id="t-csat-detail">
          <thead>
            <tr><th>Site</th><th>City</th><th>Region</th><th>CSAT Score</th><th>NPS Score</th><th>Availability</th><th>CSAT Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {sortedCsat.map(s => {
              const st = s.csat < 80 ? 'pill-red' : s.csat < 85 ? 'pill-amber' : 'pill-green';
              const sl = s.csat < 80 ? 'Critical' : s.csat < 85 ? 'Below Target' : 'On Target';
              const npsLabel = s.csat >= 85 ? '>50' : '<50';
              return (
                <tr key={s.code}>
                  <td><strong>{s.code}</strong></td>
                  <td>{s.city}</td>
                  <td>{s.region}</td>
                  <td style={{ fontFamily: 'var(--mono)', fontWeight: 600, color: s.csat < 80 ? 'var(--red)' : s.csat < 85 ? 'var(--amber)' : 'var(--green)' }}>{s.csat}</td>
                  <td style={{ fontFamily: 'var(--mono)' }}>{npsLabel}</td>
                  <td style={{ fontFamily: 'var(--mono)' }}>{s.avail.toFixed(3)}%</td>
                  <td><span className={`pill ${st}`}>{sl}</span></td>
                  <td><span style={{ fontSize: 10, color: 'var(--blue)', cursor: 'pointer' }} onClick={() => showToast(`CSAT improvement plan created for ${s.code}`, 'amber')}>Plan →</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
