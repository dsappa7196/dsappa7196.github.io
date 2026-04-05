import { useEffect, useRef } from "react";
import { getFilteredMonths, getFilteredSites, getMonthlySeries } from "../hubUtils";
import { renderFinance } from "../hubCharts";
import { DATA } from "../hubData";

export default function PageFinance({ activeFilters, showToast, onSiteClick, activeSites }) {
  const chartsRef = useRef({});

  useEffect(() => {
    const fm = getFilteredMonths(activeFilters);
    const fs = getFilteredSites(activeFilters);
    const mi = fm.map(x => x.i);
    const ml = fm.map(x => x.m);
    renderFinance(chartsRef.current, mi, ml, fs, activeFilters, onSiteClick, activeSites);
    return () => {
      Object.values(chartsRef.current).forEach(c => c.destroy());
      chartsRef.current = {};
    };
  }, [activeFilters, onSiteClick, activeSites]);

  const fs = getFilteredSites(activeFilters);
  const siteCodes = new Set(fs.map(s => s.code));
  const varSites = DATA.sites.filter(s => siteCodes.has(s.code)).sort((a, b) => b.varPct - a.varPct);

  const fm = getFilteredMonths(activeFilters);
  const mi = fm.map(x => x.i);
  const budgetSeries = getMonthlySeries('budget', activeFilters);
  const actualSeries = getMonthlySeries('actual', activeFilters);
  const totalBudget  = mi.reduce((a, i) => a + (budgetSeries[i] || 0), 0);
  const totalActual  = mi.reduce((a, i) => a + (actualSeries[i] || 0), 0);
  const totalVar     = totalActual - totalBudget;
  const fmtM = v => '$' + (Math.abs(v) / 1e6).toFixed(1) + 'M';
  const worstSite    = varSites[0];
  const bestSite     = varSites[varSites.length - 1];
  const varPct       = totalBudget > 0 ? ((totalVar / totalBudget) * 100).toFixed(1) : '0.0';

  return (
    <>
      <div className="action-bar">
        <span className="ab-label">Actions:</span>
        <button className="act-btn ab-red"     onClick={() => showToast("Variance escalation flagged for top overspend sites", "amber")}>Flag Variance Sites</button>
        <button className="act-btn ab-amber"   onClick={() => showToast("Budget review request submitted for Power Opex overspend", "amber")}>Budget Review Request</button>
        <button className="act-btn ab-neutral" onClick={() => showToast("Finance variance report exported · All sites and categories", "blue")}>Export Report</button>
        <button className="act-btn ab-teal"    onClick={() => showToast("Cost reduction plan template opened for PM shift analysis", "blue")}>Cost Reduction Plan</button>
        <div className="ab-sep"></div>
        <span className="ab-ctx">{totalVar >= 0 ? '+' : ''}{fmtM(totalVar)} cumulative · {fm.length} month{fm.length !== 1 ? 's' : ''} selected</span>
      </div>
      <div className="kpi-row">
        <div className="kpi-card blue"><div className="kpi-label">Total Budget</div><div className="kpi-val blue">{fmtM(totalBudget)}</div><div className="kpi-sub">{fm.length}-month approved</div></div>
        <div className="kpi-card amber"><div className="kpi-label">Total Actual Spend</div><div className="kpi-val amber">{fmtM(totalActual)}</div><div className="kpi-sub warn">{totalVar >= 0 ? 'Over' : 'Under'} budget</div></div>
        <div className="kpi-card red"><div className="kpi-label">Total Overspend</div><div className="kpi-val red">{totalVar >= 0 ? '+' : '-'}{fmtM(totalVar)}</div><div className="kpi-sub crit">{totalVar >= 0 ? '+' : ''}{varPct}% vs budget</div></div>
        <div className="kpi-card amber"><div className="kpi-label">Worst Site</div><div className="kpi-val amber">{worstSite?.code || '—'}</div><div className="kpi-sub warn">+{worstSite?.varPct ?? '—'}% variance</div></div>
        <div className="kpi-card teal"><div className="kpi-label">Best Site</div><div className="kpi-val blue">{bestSite?.code || '—'}</div><div className="kpi-sub ok">+{bestSite?.varPct ?? '—'}% variance</div></div>
      </div>
      <div className="g2">
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">Budget vs Actual — Monthly Trend</div><div className="cc-sub">Fleet total</div></div><div className="cc-badge cb-red">Overspend every month</div></div>
          <div className="cc-body"><canvas id="c-fin-trend" height="200"></canvas></div>
        </div>
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">Spend by Category</div><div className="cc-sub">Budget vs actual · fleet total</div></div></div>
          <div className="cc-body"><canvas id="c-spend-cat" height="200"></canvas></div>
        </div>
      </div>
      <div className="g2">
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">Variance % by Site</div><div className="cc-sub">18-month cumulative overspend per site</div></div><div className="cc-badge cb-red">ASH01 worst: +5.5%</div></div>
          <div className="cc-body"><canvas id="c-var-site" height="200"></canvas></div>
          <div className="chart-click-hint">Click any bar to filter · Click again to clear</div>
        </div>
        <div className="chart-card">
          <div className="cc-head"><div><div className="cc-title">Variance by Spend Category</div><div className="cc-sub">Budget vs actual overspend ($K) per category</div></div><div className="cc-badge cb-amber">Maint Opex +4.4%</div></div>
          <div className="cc-body"><canvas id="c-var-cat" height="200"></canvas></div>
        </div>
      </div>
      <div className="sec-label">Budget vs Actual by Site</div>
      <div className="chart-card">
        <table className="data-table" id="t-finance-site">
          <thead>
            <tr><th>Site</th><th>City</th><th>Region</th><th>Variance %</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {varSites.map(s => {
              const st = s.varPct > 4 ? 'pill-red' : s.varPct > 2 ? 'pill-amber' : 'pill-green';
              const sl = s.varPct > 4 ? 'Over Budget' : s.varPct > 2 ? 'Watch' : 'On Track';
              return (
                <tr key={s.code}>
                  <td><strong>{s.code}</strong></td>
                  <td>{s.city}</td>
                  <td>{s.region}</td>
                  <td style={{ fontFamily: 'var(--mono)', color: s.varPct > 4 ? 'var(--red)' : s.varPct > 2 ? 'var(--amber)' : 'var(--green)', fontWeight: 600 }}>+{s.varPct}%</td>
                  <td><span className={`pill ${st}`}>{sl}</span></td>
                  <td><span style={{ fontSize: 10, color: 'var(--blue)', cursor: 'pointer' }} onClick={() => showToast(`Finance review flagged for ${s.code}`, 'amber')}>Review →</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
