import { useEffect, useRef } from "react";
import { getFilteredSites } from "../hubUtils";
import { renderAssets } from "../hubCharts";
import { DATA } from "../hubData";

export default function PageAssets({ activeFilters, showToast }) {
  const chartsRef = useRef({});

  useEffect(() => {
    const fs = getFilteredSites(activeFilters);
    renderAssets(chartsRef.current, fs);
    return () => {
      Object.values(chartsRef.current).forEach(c => c.destroy());
      chartsRef.current = {};
    };
  }, [activeFilters]);

  const fs = getFilteredSites(activeFilters);
  const siteCodes = new Set(fs.map(s => s.code));
  const scale = fs.length > 0 ? fs.length / 12 : 1;
  const totalCrit      = fs.reduce((a, s) => a + s.critAssets, 0);
  const filteredCands  = DATA.replaceCands.filter(r => siteCodes.has(r.site));
  const repairCostM    = (31.4 * scale).toFixed(1);
  const replaceCostM   = Math.round(148 * scale);

  return (
    <>
      <div className="action-bar">
        <span className="ab-label">Actions:</span>
        <button className="act-btn ab-red"     onClick={() => showToast("Replacement review submitted for flagged assets · Capital team notified", "amber")}>Submit Replacement Review</button>
        <button className="act-btn ab-neutral" onClick={() => showToast("Asset intelligence report exported · Candidates included", "blue")}>Export Asset Report</button>
        <button className="act-btn ab-blue"    onClick={() => showToast("Capital cost estimate calculated for top replacement candidates", "blue")}>Capital Estimate</button>
        <div className="ab-sep"></div>
        <span className="ab-ctx">{filteredCands.length} assets flagged · {fs.length} site{fs.length !== 1 ? 's' : ''} selected</span>
      </div>
      <div className="kpi-row">
        <div className="kpi-card red"><div className="kpi-label">Critical Assets</div><div className="kpi-val red">{totalCrit}</div><div className="kpi-sub crit">Condition = Critical</div></div>
        <div className="kpi-card amber"><div className="kpi-label">Replacement Candidates</div><div className="kpi-val amber">{filteredCands.length}</div><div className="kpi-sub warn">&gt;80% of expected life + Critical</div></div>
        <div className="kpi-card amber"><div className="kpi-label">Total Repair Cost</div><div className="kpi-val amber">${repairCostM}M</div><div className="kpi-sub warn">18-month total (estimated)</div></div>
        <div className="kpi-card red"><div className="kpi-label">Avg Condition Score</div><div className="kpi-val red">54.5</div><div className="kpi-sub crit">Scale 0–100 (higher = better)</div></div>
        <div className="kpi-card amber"><div className="kpi-label">Total Replace Cost</div><div className="kpi-val blue">${replaceCostM}M</div><div className="kpi-sub">Estimated replacement value</div></div>
      </div>
      <div className="g2">
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">Repair Cost by Asset Type</div><div className="cc-sub">18-month fleet-wide · where maintenance spend is concentrated</div></div><div className="cc-badge cb-amber">Cooling + UPS dominant</div></div>
          <div className="cc-body"><canvas id="c-repair-type" height="240"></canvas></div>
        </div>
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">Critical Assets by Site</div><div className="cc-sub">Count per location</div></div><div className="cc-badge cb-red">DAL01: 22 critical</div></div>
          <div className="cc-body"><canvas id="c-crit-site" height="240"></canvas></div>
        </div>
      </div>
      <div className="g2">
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">Asset Condition by Type</div><div className="cc-sub">Critical / Warning / Good breakdown</div></div><div className="cc-badge cb-red">Cooling + Chiller worst</div></div>
          <div className="cc-body"><canvas id="c-asset-cond" height="200"></canvas></div>
        </div>
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">Capacity Utilization by Site</div><div className="cc-sub">18-month average % · Healthy range 60–85%</div></div><div className="cc-badge cb-amber">ASH01 · SJC01 · DAL01 high</div></div>
          <div className="cc-body"><canvas id="c-cap-site" height="200"></canvas></div>
        </div>
      </div>
      <div className="sec-label">Top 10 Replacement Candidates — Ranked by Condition Score</div>
      <div className="chart-card">
        <table className="data-table" id="t-replace-cands">
          <thead>
            <tr><th>#</th><th>Site</th><th>Asset Type</th><th>Age (yrs)</th><th>Expected Life</th><th>Life Used %</th><th>Replacement Cost</th><th>Condition Score</th><th>Status</th></tr>
          </thead>
          <tbody>
            {filteredCands.map((r, i) => {
              const lifePct = ((r.age / r.life) * 100).toFixed(0);
              return (
                <tr key={i}>
                  <td style={{ color: 'var(--text4)', fontFamily: 'var(--mono)' }}>{i + 1}</td>
                  <td><strong>{r.site}</strong></td>
                  <td>{r.type}</td>
                  <td style={{ fontFamily: 'var(--mono)' }}>{r.age}</td>
                  <td style={{ fontFamily: 'var(--mono)' }}>{r.life}</td>
                  <td style={{ fontFamily: 'var(--mono)', color: 'var(--red)', fontWeight: 600 }}>{lifePct}%</td>
                  <td style={{ fontFamily: 'var(--mono)' }}>${r.cost.toLocaleString()}</td>
                  <td style={{ fontFamily: 'var(--mono)', color: 'var(--red)' }}>{r.score}/100</td>
                  <td><span className="pill pill-red">Replace</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
