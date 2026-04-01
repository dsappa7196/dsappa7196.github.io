import { useState } from "react";

const TABS = [
  { id: 'dashboards', label: 'Available Dashboards' },
  { id: 'insights',   label: 'Current Insights' },
  { id: 'metrics',    label: 'Metric Definitions' },
  { id: 'datamodel',  label: 'Data Model' },
  { id: 'sourcedata', label: 'Source Data' },
  { id: 'builtnotes', label: 'How It Was Built' },
  { id: 'howto',      label: 'How to Use' },
  { id: 'ownership',  label: 'Ownership' },
];

export default function HubView({ onSwitchToDashboard, onNavDB }) {
  const [activeTab, setActiveTab] = useState('dashboards');

  const navDash = (page) => {
    onSwitchToDashboard();
    setTimeout(() => onNavDB(page), 80);
  };

  return (
    <>
      {/* Hero */}
      <div className="hub-hero">
        <div className="hub-breadcrumb">Americas Operations Analytics <span>→ Analytics Hub</span></div>
        <div className="hub-title">Operations <em>Analytics Hub</em></div>
        <div className="hub-desc">A unified decision-support system integrating operations, maintenance, asset, finance, and customer data across 12 Americas sites. Built to answer not just what the data shows — but why it's happening and what to do next.</div>
        <div className="hub-meta-row">
          <div className="hub-meta-item"><strong>12</strong> Sites</div>
          <div className="hub-meta-item"><strong>8</strong> Data Domains</div>
          <div className="hub-meta-item"><strong>6</strong> Dashboard Views</div>
          <div className="hub-meta-item">Jan 2024 – Jun 2025</div>
          <div className="hub-meta-item">Refresh: <strong>Monthly</strong></div>
        </div>
        <div className="hub-alert" onClick={onSwitchToDashboard}>
          <div className="hub-alert-dot"></div>
          <div className="hub-alert-text"><strong>Action Required — DAL01 (Dallas):</strong> Composite risk score 81.6/100. Availability 99.678% below 99.9% SLA target. 5,945 hrs downtime. CSAT 74.9 — lowest in fleet.</div>
          <div className="hub-alert-link" onClick={e => { e.stopPropagation(); navDash('risk'); }}>Open Site Risk →</div>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="hub-kpi-strip">
        <div className="hub-kpi"><div className="hub-kpi-label">Fleet Availability</div><div className="hub-kpi-val green">99.78%</div><div className="hub-kpi-sub warn">↓ Below 99.9% SLA target</div></div>
        <div className="hub-kpi"><div className="hub-kpi-label">Total Incidents</div><div className="hub-kpi-val amber">9,099</div><div className="hub-kpi-sub crit">584 P1 · 750 outage events</div></div>
        <div className="hub-kpi"><div className="hub-kpi-label">Total Repair Cost</div><div className="hub-kpi-val amber">$31.4M</div><div className="hub-kpi-sub warn">40.8% SLA breach rate</div></div>
        <div className="hub-kpi"><div className="hub-kpi-label">Budget Overspend</div><div className="hub-kpi-val red">+$5.4M</div><div className="hub-kpi-sub crit">+4.0% over budget · 18 mos</div></div>
        <div className="hub-kpi"><div className="hub-kpi-label">Avg Fleet CSAT</div><div className="hub-kpi-val amber">83.5</div><div className="hub-kpi-sub warn">Below 85 target · DAL01: 74.9</div></div>
        <div className="hub-kpi"><div className="hub-kpi-label">Critical Assets</div><div className="hub-kpi-val red">211</div><div className="hub-kpi-sub crit">107 flagged for replacement</div></div>
      </div>

      {/* Hub Tabs */}
      <div className="hub-tabs">
        {TABS.map(t => (
          <button key={t.id} className={`htab${activeTab === t.id ? ' active' : ''}`} onClick={() => setActiveTab(t.id)}>{t.label}</button>
        ))}
      </div>

      <div className="hub-body">

        {/* Tab: Dashboards */}
        {activeTab === 'dashboards' && (
          <div className="hub-tab-content active">
            <div className="hub-section">
              <div className="hub-section-head">
                <div className="hub-section-label">Decision-Support Views</div>
                <div className="hub-section-line"></div>
                <div className="hub-section-count">6 Views · Click to Open</div>
              </div>
              <div className="dash-grid">
                <div className="dash-card" onClick={() => navDash('overview')}>
                  <div className="dc-top"><div className="dc-accent" style={{ background: '#1a56db' }}></div><div className="dc-icon">🏠</div><div className="dc-title">Executive Overview</div><div className="dc-desc">Fleet-level KPIs, 3 decision alerts, availability &amp; incident trends, budget snapshot, and site risk summary. Start here.</div></div>
                  <div className="dc-foot"><div className="dc-status live">● Live</div><div className="dc-arrow">Open →</div></div>
                </div>
                <div className="dash-card" onClick={() => navDash('risk')}>
                  <div className="dc-top"><div className="dc-accent" style={{ background: '#be123c' }}></div><div className="dc-icon">⚠️</div><div className="dc-title">Site Risk Intelligence</div><div className="dc-desc">Composite risk scoring across all 12 sites. DAL01 trend analysis, corrective ratio, full site scorecard with drill-down.</div></div>
                  <div className="dc-foot"><div className="dc-status crit">● Action Required: DAL01</div><div className="dc-arrow">Open →</div></div>
                </div>
                <div className="dash-card" onClick={() => navDash('assets')}>
                  <div className="dc-top"><div className="dc-accent" style={{ background: '#b45309' }}></div><div className="dc-icon">🔧</div><div className="dc-title">Asset Intelligence</div><div className="dc-desc">Repair-vs-replace decision framework. 107 assets flagged for replacement review. Top candidates ranked by cost ratio.</div></div>
                  <div className="dc-foot"><div className="dc-status warn">● 107 Assets Flagged</div><div className="dc-arrow">Open →</div></div>
                </div>
                <div className="dash-card" onClick={() => navDash('finance')}>
                  <div className="dc-top"><div className="dc-accent" style={{ background: '#0e7490' }}></div><div className="dc-icon">💰</div><div className="dc-title">Finance &amp; Spend Variance</div><div className="dc-desc">Budget vs actual across all sites and spend categories. +$5.4M cumulative overspend. Monthly variance trend and site breakdown.</div></div>
                  <div className="dc-foot"><div className="dc-status warn">● +4.0% Over Budget</div><div className="dc-arrow">Open →</div></div>
                </div>
                <div className="dash-card" onClick={() => navDash('maintenance')}>
                  <div className="dc-top"><div className="dc-accent" style={{ background: '#047857' }}></div><div className="dc-icon">⚙️</div><div className="dc-title">Maintenance Analytics</div><div className="dc-desc">Failure Pareto, SLA breach rate, corrective vs preventive ratio. 3,170 SLA breaches across 7,761 work orders.</div></div>
                  <div className="dc-foot"><div className="dc-status warn">● 40.8% SLA Breach Rate</div><div className="dc-arrow">Open →</div></div>
                </div>
                <div className="dash-card" onClick={() => navDash('customer')}>
                  <div className="dc-top"><div className="dc-accent" style={{ background: '#6d28d9' }}></div><div className="dc-icon">⭐</div><div className="dc-title">Customer Experience</div><div className="dc-desc">CSAT &amp; NPS trends, site performance ranking, correlation with operational availability. Fleet avg 83.5 vs 85 target.</div></div>
                  <div className="dc-foot"><div className="dc-status warn">● Below 85 CSAT Target</div><div className="dc-arrow">Open →</div></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Insights */}
        {activeTab === 'insights' && (
          <div className="hub-tab-content active">
            <div className="hub-section">
              <div className="hub-section-head">
                <div className="hub-section-label">Current Analytical Insights</div>
                <div className="hub-section-line"></div>
                <div className="hub-section-count">3 Critical · 3 Warning</div>
              </div>
              <div className="insights-grid">
                <div className="insight-card crit">
                  <div className="insight-tag">● Decision 1 — Site Risk</div>
                  <div className="insight-title">DAL01 requires immediate escalation</div>
                  <div className="insight-body"><strong>What:</strong> Risk score 81.6/100 — highest in fleet. <strong>Why:</strong> 61.6% corrective ratio driving cascading failures + 458 SLA breaches + 5,945 hrs downtime — 44% of fleet total. <strong>Action:</strong> Ops leadership review + increase PM frequency + resource reallocation.</div>
                  <div className="insight-action" onClick={() => navDash('risk')}>→ Open Site Risk view</div>
                </div>
                <div className="insight-card warn">
                  <div className="insight-tag">● Decision 2 — Asset Intelligence</div>
                  <div className="insight-title">107 assets past cost-efficiency threshold</div>
                  <div className="insight-body"><strong>What:</strong> 107 assets flagged for replacement review; top 10 have condition score 25/100. <strong>Why:</strong> Cooling class avg age 8.6 yrs at 10-yr expected life — Routine Wear drives $6.1M (19.5%) of repair cost. <strong>Action:</strong> Initiate asset replacement review starting top 10 candidates.</div>
                  <div className="insight-action" onClick={() => navDash('assets')}>→ Open Asset Intelligence view</div>
                </div>
                <div className="insight-card warn">
                  <div className="insight-tag">● Decision 3 — Spend Deviation</div>
                  <div className="insight-title">Structural overspend — every month, every category</div>
                  <div className="insight-body"><strong>What:</strong> +$5.4M over budget across 18 months — every single month is overspent. <strong>Why:</strong> Corrective WOs cost 15–25% more than PM. DAL01 alone: $957K variance. <strong>Action:</strong> Shift DAL01/ATL01/CHI01 PM ratio to ≥50% to break the corrective cycle.</div>
                  <div className="insight-action" onClick={() => navDash('finance')}>→ Open Finance &amp; Spend view</div>
                </div>
                <div className="insight-card info">
                  <div className="insight-tag">● Observation — Maintenance</div>
                  <div className="insight-title">40.8% SLA breach rate indicates capacity gap</div>
                  <div className="insight-body"><strong>What:</strong> 3,170 of 7,761 WOs breached SLA. <strong>Why:</strong> 61.6% corrective ratio means teams are reactive, not proactive — insufficient time to meet response SLAs. <strong>Benchmark:</strong> Industry target is ≤15% breach rate. Fleet is 2.7× over target.</div>
                  <div className="insight-action" onClick={() => navDash('maintenance')}>→ Open Maintenance view</div>
                </div>
                <div className="insight-card info">
                  <div className="insight-tag">● Observation — Customer</div>
                  <div className="insight-title">CSAT decline tracks with availability degradation</div>
                  <div className="insight-body"><strong>What:</strong> Fleet CSAT dropped from 84.4 (Jan 2024) to 81.5 (Aug 2024), recovering to 85.2 (Feb 2025). <strong>Why:</strong> Correlation with downtime peaks visible — Aug 2024 had highest downtime (2,575 hrs) and lowest CSAT (81.5). <strong>Action:</strong> Monitor monthly; prioritize DAL01 CSAT at 74.9.</div>
                  <div className="insight-action" onClick={() => navDash('customer')}>→ Open Customer Experience view</div>
                </div>
                <div className="insight-card info">
                  <div className="insight-tag">● Observation — Performance</div>
                  <div className="insight-title">ASH01 and SJC01 emerging as secondary risk sites</div>
                  <div className="insight-body"><strong>What:</strong> ASH01 risk 70.2, SJC01 risk 67.2 — both in the warning tier behind DAL01. <strong>Why:</strong> ASH01 has highest variance_pct (5.5%) in fleet; SJC01 has 41.3% SLA breach rate. <strong>Action:</strong> Pre-emptive PM increase before they escalate to critical tier.</div>
                  <div className="insight-action" onClick={() => navDash('risk')}>→ Open Site Risk view</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Metrics */}
        {activeTab === 'metrics' && (
          <div className="hub-tab-content active">
            <div className="hub-section">
              <div className="hub-section-head"><div className="hub-section-label">Operations Metrics</div><div className="hub-section-line"></div><div className="hub-section-count">Source: operations_daily</div></div>
              <div className="metric-grid">
                <div className="metric-card"><div className="mc-name">Availability %</div><div className="mc-formula">AVG(availability_pct) per scope</div><div className="mc-desc">Daily site availability as a percentage of the 24-hr window. Primary SLA metric. Derived from downtime hours recorded per site per day.</div><div className="mc-target">Target: ≥99.9% · Fleet Avg: 99.78%</div></div>
                <div className="metric-card"><div className="mc-name">Total Incidents</div><div className="mc-formula">SUM(incidents_total) = P1 + P2 + P3</div><div className="mc-desc">Total operational incidents across all priority levels per site per period. P1 = critical/immediate, P2 = high, P3 = medium. Combined count reflects overall operational health.</div><div className="mc-target">Fleet Total: 9,099 · P1: 584 · Minimize all tiers</div></div>
                <div className="metric-card"><div className="mc-name">P1 Incident Count</div><div className="mc-formula">SUM(incidents_p1) from operations_daily</div><div className="mc-desc">Priority 1 incidents requiring immediate escalation. Direct impact on customer SLA and availability. Each P1 triggers mandatory incident response protocol.</div><div className="mc-target">Target: Minimize · Current: 584 over 18 months</div></div>
                <div className="metric-card"><div className="mc-name">Downtime Hours</div><div className="mc-formula">SUM(downtime_hours_total) per scope</div><div className="mc-desc">Total operational downtime hours per site per period. Fleet total 41,297 hrs across 18 months. DAL01 alone accounts for 5,945 hrs — 14.4% of fleet total.</div><div className="mc-target">Target: Minimize · Fleet Total: 41,297 hrs</div></div>
                <div className="metric-card"><div className="mc-name">Outage Events</div><div className="mc-formula">SUM(outage_flag) from operations_daily</div><div className="mc-desc">Binary flag per day indicating a full or partial site outage occurred. Distinct from incidents — outages represent service interruptions affecting customer availability directly.</div><div className="mc-target">Fleet Total: 750 events · Peak: Jun–Oct 2024</div></div>
                <div className="metric-card"><div className="mc-name">Capacity Utilization %</div><div className="mc-formula">AVG(capacity_utilization_pct) from operations_daily</div><div className="mc-desc">Average percentage of available data center capacity in use per site per day. High utilization (&gt;75%) correlates with increased outage frequency. Used for growth planning.</div><div className="mc-target">Healthy Range: 60–85% · DAL01/ASH01/SJC01: ~76%</div></div>
                <div className="metric-card"><div className="mc-name">Power Usage (MW)</div><div className="mc-formula">AVG(power_usage_mw) from operations_daily</div><div className="mc-desc">Average power consumed in megawatts per site per day. Reflects infrastructure load and energy cost drivers. High-power sites (ASH01: 54.6MW avg) require closer monitoring.</div><div className="mc-target">Fleet Avg: varies by site · ASH01 highest: 54.6MW</div></div>
                <div className="metric-card"><div className="mc-name">Hall Temperature (°F)</div><div className="mc-formula">AVG(avg_hall_temperature_f) from operations_daily</div><div className="mc-desc">Average data hall temperature in Fahrenheit per site per day. Temperature deviations outside 65–80°F range can trigger cooling failures and asset degradation.</div><div className="mc-target">Safe Range: 65–80°F · PHX01/MIA01 run warmest</div></div>
              </div>
            </div>
            <div className="hub-section">
              <div className="hub-section-head"><div className="hub-section-label">Maintenance Metrics</div><div className="hub-section-line"></div><div className="hub-section-count">Source: maintenance_work_orders</div></div>
              <div className="metric-grid">
                <div className="metric-card"><div className="mc-name">SLA Breach Rate %</div><div className="mc-formula">SUM(sla_breach_flag) ÷ COUNTROWS(Maintenance) × 100</div><div className="mc-desc">Percentage of maintenance WOs that missed defined response or resolution SLA windows. High breach rate signals understaffing, poor scheduling, or excessive corrective load.</div><div className="mc-target">Target: ≤15% · Current: 40.8% — 2.7× over target ⚠️</div></div>
                <div className="metric-card"><div className="mc-name">Corrective Ratio %</div><div className="mc-formula">Corrective WOs ÷ Total WOs × 100</div><div className="mc-desc">Proportion of reactive (corrective) versus proactive (preventive) maintenance. High corrective ratio drives SLA breaches and budget overspend since reactive work costs 15–25% more.</div><div className="mc-target">Target: ≤40% corrective · Current: 61.6% ⚠️</div></div>
                <div className="metric-card"><div className="mc-name">Total Repair Cost</div><div className="mc-formula">SUM(repair_cost_usd) = parts + labor</div><div className="mc-desc">Total cost of maintenance work orders including parts and labor. Fleet total $31.4M over 18 months. Dominated by Routine Wear ($6.1M, 19.5%) and Sensor failures ($4.1M, 13%).</div><div className="mc-target">Fleet Total: $31.4M · Routine Wear is largest category</div></div>
                <div className="metric-card"><div className="mc-name">Avg Response Time (hrs)</div><div className="mc-formula">AVG(response_time_hours) from maintenance_work_orders</div><div className="mc-desc">Average time in hours from work order creation to first technician response. Key SLA component. LAX01 worst at 4.71h avg; CHI01 best at 3.66h.</div><div className="mc-target">Target: ≤4.0h · Fleet Avg: ~4.2h · LAX01 worst: 4.71h</div></div>
                <div className="metric-card"><div className="mc-name">Avg Resolution Time (hrs)</div><div className="mc-formula">AVG(resolution_time_hours) from maintenance_work_orders</div><div className="mc-desc">Average time from work order opening to full resolution and closure. Longer resolution times indicate complex failures or parts availability issues.</div><div className="mc-target">Fleet Avg: ~16.7h · NYC01 longest: 17.1h</div></div>
                <div className="metric-card"><div className="mc-name">Repeat Failure Count</div><div className="mc-formula">SUM(repeat_failure_flag) from maintenance_work_orders</div><div className="mc-desc">Work orders flagged as repeat failures on the same asset within a period. High repeat failures indicate root cause not being addressed — linked to corrective cycle and asset condition.</div><div className="mc-target">Fleet Total: 1,284 · DAL01: 189 (highest)</div></div>
              </div>
            </div>
            <div className="hub-section">
              <div className="hub-section-head"><div className="hub-section-label">Asset Metrics</div><div className="hub-section-line"></div><div className="hub-section-count">Source: assets</div></div>
              <div className="metric-grid">
                <div className="metric-card"><div className="mc-name">Composite Risk Score</div><div className="mc-formula">Avail(25%) + Incidents(20%) + Downtime(20%) + SLA(20%) + Variance(15%)</div><div className="mc-desc">Weighted composite score 0–100 across five operational signals per site. Higher = higher operational risk. Calculated as a DAX column on the Site dimension table.</div><div className="mc-target">Low: 0–30 · Warning: 30–60 · Critical: 60–100 · DAL01: 81.6</div></div>
                <div className="metric-card"><div className="mc-name">Condition Score</div><div className="mc-formula">AVG(condition_score) from assets — scale 0 to 100</div><div className="mc-desc">Asset health score from 0 (failed) to 100 (new condition). Derived from age, maintenance history, and failure frequency. Below 30 triggers replacement review flag.</div><div className="mc-target">Fleet Avg: 54.5 · Replacement Review: &lt;30 · 107 assets flagged</div></div>
                <div className="metric-card"><div className="mc-name">Asset Life Used %</div><div className="mc-formula">current_age_years ÷ expected_life_years × 100</div><div className="mc-desc">Percentage of an asset's expected operational life that has been consumed. Used alongside repair cost to determine repair-vs-replace decision threshold.</div><div className="mc-target">Review at: &gt;80% life used · Replace when: &gt;100% + Critical condition</div></div>
                <div className="metric-card"><div className="mc-name">Repair-to-Replace Ratio</div><div className="mc-formula">SUM(repair_cost_usd) ÷ SUM(replacement_cost_usd)</div><div className="mc-desc">Total accumulated repair cost divided by replacement cost. Core decision metric from Matt's interview example. When repair costs approach replacement value, replacement is economically justified.</div><div className="mc-target">Review Flag: &gt;0.5 · Replace Decision: &gt;1.0</div></div>
                <div className="metric-card"><div className="mc-name">Critical Asset Count</div><div className="mc-formula">COUNTROWS where asset_condition = 'Critical'</div><div className="mc-desc">Count of active assets in Critical condition status. Critical assets have the highest failure probability and should be prioritized for maintenance scheduling and replacement review.</div><div className="mc-target">Current: 211 critical · 107 candidates for replacement review</div></div>
                <div className="metric-card"><div className="mc-name">Depreciated Value</div><div className="mc-formula">SUM(depreciated_value_usd) from assets</div><div className="mc-desc">Current book value of assets after depreciation. Used alongside replacement cost and repair cost to understand total capital at risk and inform budget planning for asset replacement programs.</div><div className="mc-target">Tracked per asset · Used in capital expenditure planning</div></div>
              </div>
            </div>
            <div className="hub-section">
              <div className="hub-section-head"><div className="hub-section-label">Finance Metrics</div><div className="hub-section-line"></div><div className="hub-section-count">Source: finance_monthly</div></div>
              <div className="metric-grid">
                <div className="metric-card"><div className="mc-name">Budget Variance %</div><div className="mc-formula">(Actual Spend − Budget) ÷ Budget × 100</div><div className="mc-desc">Percentage by which actual operational spend exceeded the approved monthly budget. Positive = overspend. Every single month in the 18-month period shows positive variance.</div><div className="mc-target">Target: ±2% · Current: +4.0% · ASH01 worst: +5.5%</div></div>
                <div className="metric-card"><div className="mc-name">Budget Variance $ (USD)</div><div className="mc-formula">SUM(actual_spend_usd) − SUM(budget_usd)</div><div className="mc-desc">Absolute dollar overspend per site, category, or period. More actionable than % for prioritising corrective actions. Total fleet overspend: $5.4M over 18 months across all categories.</div><div className="mc-target">Fleet Total: +$5.4M · Largest category: Power Opex +$1.8M</div></div>
                <div className="metric-card"><div className="mc-name">Actual Spend</div><div className="mc-formula">SUM(actual_spend_usd) from finance_monthly</div><div className="mc-desc">Total operational expenditure per site, spend category, and month. Broken into four categories: Power Opex, Capex Replacement, Maintenance Opex, and Vendor Services.</div><div className="mc-target">Fleet Total: $141.5M over 18 months</div></div>
                <div className="metric-card"><div className="mc-name">Approved Budget</div><div className="mc-formula">SUM(budget_usd) from finance_monthly</div><div className="mc-desc">Total approved operational budget per site and spend category per month. Baseline for all variance calculations. Budget is set per cost center (OPS-DC, OPS-FAC, FIN-CAPEX, ENG-SVC).</div><div className="mc-target">Fleet Total: $136.1M over 18 months</div></div>
              </div>
            </div>
            <div className="hub-section">
              <div className="hub-section-head"><div className="hub-section-label">Customer &amp; Installed Base Metrics</div><div className="hub-section-line"></div><div className="hub-section-count">Source: customer_experience_monthly · installed_customer_base_monthly</div></div>
              <div className="metric-grid">
                <div className="metric-card"><div className="mc-name">CSAT Score</div><div className="mc-formula">AVG(customer_satisfaction_score) per site per month</div><div className="mc-desc">Monthly customer satisfaction survey average per site (0–100 scale). Strongly correlated with availability — sites with lowest availability (DAL01: 99.678%) also have lowest CSAT (74.9).</div><div className="mc-target">Target: ≥85 · Fleet Avg: 83.5 · DAL01: 74.9 ⚠️</div></div>
                <div className="metric-card"><div className="mc-name">NPS Score</div><div className="mc-formula">AVG(nps_score) from customer_experience_monthly</div><div className="mc-desc">Net Promoter Score measuring customer loyalty and likelihood to recommend. Range −100 to +100. Used alongside CSAT for a fuller picture of customer sentiment and operational impact.</div><div className="mc-target">Target: ≥50 · Fleet Avg: 43.4 · DEN01 best: 46.4</div></div>
                <div className="metric-card"><div className="mc-name">Installed Customers</div><div className="mc-formula">SUM(installed_customers_count) from installed_customer_base_monthly</div><div className="mc-desc">Total number of installed customer accounts across all sites per month. Growth indicator for business health. Fleet grew from 976 (Jan 2024) to 1,066 (Jun 2025) — +9.2% over 18 months.</div><div className="mc-target">Jan 2024: 976 → Jun 2025: 1,066 (+9.2% growth)</div></div>
                <div className="metric-card"><div className="mc-name">Committed Power (MW)</div><div className="mc-formula">SUM(committed_power_mw) from installed_customer_base_monthly</div><div className="mc-desc">Total power capacity committed to customers under contract per site per month. Leading indicator of revenue and capacity planning needs. Tracks alongside installed customer growth.</div><div className="mc-target">Fleet Total: ~360MW avg monthly committed capacity</div></div>
                <div className="metric-card"><div className="mc-name">Active Cabinets</div><div className="mc-formula">SUM(active_cabinets_count) from installed_customer_base_monthly</div><div className="mc-desc">Number of active customer cabinet units across all sites per month. Direct proxy for colocation revenue and physical capacity consumption. Fluctuates with customer moves and expansions.</div><div className="mc-target">Fleet Avg: ~2,750 active cabinets per month</div></div>
                <div className="metric-card"><div className="mc-name">Cross-connects</div><div className="mc-formula">SUM(cross_connects_count) from installed_customer_base_monthly</div><div className="mc-desc">Total physical interconnections between customer systems within the data center. High cross-connect density indicates deep customer ecosystem integration and is a key retention and revenue metric.</div><div className="mc-target">Fleet Total: ~4,900 avg per month · Growing YoY</div></div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Data Model */}
        {activeTab === 'datamodel' && (
          <div className="hub-tab-content active">
            <div className="hub-section">
              <div className="hub-section-head"><div className="hub-section-label">Solution Architecture</div><div className="hub-section-line"></div><div className="hub-section-count">End-to-end data flow</div></div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: 24, marginBottom: 24, overflowX: 'auto' }}>
                <svg viewBox="0 0 980 340" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', minWidth: 720, fontFamily: "'DM Sans',sans-serif" }}>
                  <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#9ca3af"/></marker></defs>
                  <rect x="2" y="30" width="148" height="290" rx="8" fill="#f8f9fb" stroke="#e2e5ea" strokeWidth="1.5"/>
                  <rect x="168" y="100" width="108" height="130" rx="8" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5"/>
                  <rect x="294" y="80" width="108" height="170" rx="8" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1.5"/>
                  <rect x="420" y="60" width="120" height="210" rx="8" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5"/>
                  <rect x="558" y="40" width="120" height="250" rx="8" fill="#fef9c3" stroke="#fde68a" strokeWidth="1.5"/>
                  <rect x="696" y="60" width="110" height="210" rx="8" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1.5"/>
                  <rect x="824" y="80" width="150" height="170" rx="8" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="1.5"/>
                  <text x="76"  y="22" textAnchor="middle" fontSize="9" fontWeight="600" fill="#6b7280" letterSpacing=".08em">DATA SOURCES</text>
                  <text x="222" y="92" textAnchor="middle" fontSize="9" fontWeight="600" fill="#3b82f6" letterSpacing=".08em">INGESTION</text>
                  <text x="348" y="72" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a" letterSpacing=".08em">STORAGE</text>
                  <text x="480" y="52" textAnchor="middle" fontSize="9" fontWeight="600" fill="#3b82f6" letterSpacing=".08em">ANALYTICS</text>
                  <text x="618" y="32" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b45309" letterSpacing=".08em">DASHBOARDS</text>
                  <text x="751" y="52" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a" letterSpacing=".08em">INSIGHTS</text>
                  <text x="899" y="72" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed" letterSpacing=".08em">ACCESS &amp; USERS</text>
                  {[['Operations / Incidents',44],['Maintenance / WOs',74],['Assets / Infrastructure',104],['Finance / Budget',134],['Customer / CSAT',164],['Installed Base',194],['Site Dimension',224],['Date Dimension',254]].map(([label,y])=>(
                    <g key={label}><rect x="12" y={y} width="128" height="24" rx="4" fill="#fff" stroke="#e2e5ea"/><text x="76" y={y+16} textAnchor="middle" fontSize="10" fill="#374151">{label}</text></g>
                  ))}
                  {[['SQL Ingestion',112],['CSV Batch Load',142],['Data Cleaning',172],['Transformation',202]].map(([label,y])=>(
                    <g key={label}><rect x="176" y={y} width="92" height="22" rx="4" fill="#dbeafe" stroke="#93c5fd"/><text x="222" y={y+15} textAnchor="middle" fontSize="10" fill="#1d4ed8">{label}</text></g>
                  ))}
                  <rect x="302" y="94" width="92" height="36" rx="4" fill="#dcfce7" stroke="#86efac"/>
                  <text x="348" y="108" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">MySQL</text>
                  <text x="348" y="122" textAnchor="middle" fontSize="9" fill="#16a34a">8 Tables · Star Schema</text>
                  {[['Raw (Bronze)',138],['Cleaned (Silver)',168],['Modelled (Gold)',198]].map(([label,y])=>(
                    <g key={label}><rect x="302" y={y} width="92" height="22" rx="4" fill="#dcfce7" stroke="#86efac"/><text x="348" y={y+15} textAnchor="middle" fontSize="10" fill="#15803d">{label}</text></g>
                  ))}
                  <rect x="428" y="72" width="104" height="30" rx="4" fill="#dbeafe" stroke="#93c5fd"/>
                  <text x="480" y="84" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1d4ed8">Power BI</text>
                  <text x="480" y="96" textAnchor="middle" fontSize="9" fill="#3b82f6">Semantic Model</text>
                  {[['KPI / DAX Measures',110],['Time Intelligence',140],['Composite Risk Score',170]].map(([label,y])=>(
                    <g key={label}><rect x="428" y={y} width="104" height="22" rx="4" fill="#dbeafe" stroke="#93c5fd"/><text x="480" y={y+15} textAnchor="middle" fontSize="10" fill="#1d4ed8">{label}</text></g>
                  ))}
                  <rect x="428" y="200" width="104" height="22" rx="4" fill="#e0f2fe" stroke="#7dd3fc"/>
                  <text x="480" y="215" textAnchor="middle" fontSize="10" fill="#0369a1">Python Risk Scoring</text>
                  {[['Executive Overview',72],['Site Risk Intel',102],['Asset Intelligence',132],['Finance & Spend',162],['Maintenance Analytics',192],['Customer Experience',222]].map(([label,y])=>(
                    <g key={label}><rect x="566" y={y} width="104" height="22" rx="4" fill="#fef9c3" stroke="#fde68a"/><text x="618" y={y+15} textAnchor="middle" fontSize="10" fill="#92400e">{label}</text></g>
                  ))}
                  {[['What is happening',72],['Why it is happening',102],['Decision alerts',132],['Root cause drivers',162],['Recommended actions',192],['KPI narrative',222]].map(([label,y])=>(
                    <g key={label}><rect x="704" y={y} width="94" height="22" rx="4" fill="#dcfce7" stroke="#86efac"/><text x="751" y={y+15} textAnchor="middle" fontSize="10" fill="#15803d">{label}</text></g>
                  ))}
                  {[['Analytics Hub (HTML)',92],['Metric Definitions',122],['Operations Team',152],['Finance Team',182],['Leadership',212]].map(([label,y])=>(
                    <g key={label}><rect x="832" y={y} width="134" height="22" rx="4" fill="#ede9fe" stroke="#c4b5fd"/><text x="899" y={y+15} textAnchor="middle" fontSize="10" fill="#6d28d9">{label}</text></g>
                  ))}
                  <line x1="140" y1="175" x2="165" y2="175" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arr)"/>
                  <line x1="275" y1="170" x2="292" y2="170" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arr)"/>
                  <line x1="402" y1="165" x2="418" y2="165" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arr)"/>
                  <line x1="540" y1="155" x2="556" y2="155" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arr)"/>
                  <line x1="678" y1="152" x2="694" y2="152" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arr)"/>
                  <line x1="814" y1="155" x2="830" y2="155" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arr)"/>
                </svg>
              </div>
            </div>
            <div className="hub-section">
              <div className="hub-section-head"><div className="hub-section-label">Star Schema — 8 Tables · MySQL</div><div className="hub-section-line"></div><div className="hub-section-count">2 Dimensions · 6 Fact Tables</div></div>
              <div className="datamodel-grid">
                <div className="dm-card"><div className="dm-type dm-dim">Dimension</div><div className="dm-name">Site</div><div className="dm-field pk">site_code (PK)</div><div className="dm-field">region, country, city</div><div className="dm-field">site_size, capacity_mw</div><div className="dm-field">power_redundancy</div><div className="dm-field">risk_baseline_index</div><div className="dm-field">Composite Risk Score (calc)</div><div className="dm-rows">12 rows</div></div>
                <div className="dm-card"><div className="dm-type dm-dim">Dimension</div><div className="dm-name">Date</div><div className="dm-field pk">calendar_date (PK)</div><div className="dm-field pk">year_month (PK2)</div><div className="dm-field">year, quarter, month_num</div><div className="dm-field">month_name, week_of_year</div><div className="dm-field">day_of_week, is_weekend</div><div className="dm-rows">547 rows · Marked as Date Table</div></div>
                <div className="dm-card"><div className="dm-type dm-fact">Fact Table</div><div className="dm-name">Operations</div><div className="dm-field fk">operations_date → Date</div><div className="dm-field fk">site_code → Site</div><div className="dm-field">incidents_total / p1 / p2 / p3</div><div className="dm-field">downtime_hours_total</div><div className="dm-field">availability_pct</div><div className="dm-field">sla_met_flag, outage_flag</div><div className="dm-rows">6,564 rows · Daily grain</div></div>
                <div className="dm-card"><div className="dm-type dm-fact">Fact Table</div><div className="dm-name">Maintenance</div><div className="dm-field fk">work_order_date → Date</div><div className="dm-field fk">site_code → Site</div><div className="dm-field">maintenance_type, failure_category</div><div className="dm-field">repair_cost_usd, downtime_hours</div><div className="dm-field">sla_breach_flag</div><div className="dm-field">response/resolution_time_hrs</div><div className="dm-rows">7,761 rows · Event grain</div></div>
                <div className="dm-card"><div className="dm-type dm-fact">Fact Table</div><div className="dm-name">Assets</div><div className="dm-field pk">asset_id (PK)</div><div className="dm-field fk">site_code → Site</div><div className="dm-field">asset_type, asset_condition</div><div className="dm-field">current_age_years, expected_life</div><div className="dm-field">replacement_cost_usd</div><div className="dm-field">condition_score, criticality</div><div className="dm-rows">540 rows · Asset master</div></div>
                <div className="dm-card"><div className="dm-type dm-fact">Fact Table</div><div className="dm-name">Finance</div><div className="dm-field fk">year_month → Date</div><div className="dm-field fk">site_code → Site</div><div className="dm-field">spend_category, cost_center</div><div className="dm-field">budget_usd, actual_spend_usd</div><div className="dm-field">variance_usd, variance_pct</div><div className="dm-field">vendor_name, po_number</div><div className="dm-rows">864 rows · Monthly grain</div></div>
                <div className="dm-card"><div className="dm-type dm-fact">Fact Table</div><div className="dm-name">Customer</div><div className="dm-field fk">year_month → Date</div><div className="dm-field fk">site_code → Site</div><div className="dm-field">customer_satisfaction_score</div><div className="dm-field">nps_score</div><div className="dm-field">survey_response_count</div><div className="dm-rows">216 rows · Monthly grain</div></div>
                <div className="dm-card"><div className="dm-type dm-fact">Fact Table</div><div className="dm-name">InstalledBase</div><div className="dm-field fk">year_month → Date</div><div className="dm-field fk">site_code → Site</div><div className="dm-field">installed_customers_count</div><div className="dm-field">active_cabinets_count</div><div className="dm-field">committed_power_mw</div><div className="dm-field">cross_connects_count</div><div className="dm-rows">216 rows · Monthly grain</div></div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Source Data */}
        {activeTab === 'sourcedata' && (
          <div className="hub-tab-content active">
            <div className="hub-section">
              <div className="hub-section-head"><div className="hub-section-label">Dataset Downloads</div><div className="hub-section-line"></div><div className="hub-section-count">8 tables · 16,666 total rows · Jan 2024 – Jun 2025</div></div>
              <div style={{ background: 'var(--blue-lt)', border: '1px solid rgba(26,86,219,.2)', borderRadius: 8, padding: '14px 18px', marginBottom: 20, fontSize: 12, color: 'var(--text2)', lineHeight: 1.7 }}>
                <strong style={{ color: 'var(--blue)' }}>About this dataset.</strong> All data was independently designed and generated to represent a realistic data center operations environment across 12 Americas sites over 18 months. The schema, column definitions, business logic, and relationships were authored from scratch to support three core analytical decisions: site risk prioritisation, asset repair-vs-replace analysis, and spend variance investigation. No real company data is used.
              </div>
              <div className="datafiles-grid">
                {[
                  { name: 'operations_daily.csv', badge: 'Fact · Daily grain', stats: '6,564 rows · 19 columns · 547 days × 12 sites', desc: 'Daily operational metrics per site — availability %, incident counts (P1/P2/P3), downtime hours, outage flag, capacity utilization %, power usage MW, hall temperature, visitor count, and customer tickets. Primary source for all availability and incident KPIs.', cols: 'availability_pct · incidents_p1/p2/p3 · downtime_hours_total · outage_flag · capacity_utilization_pct · power_usage_mw · sla_met_flag', key: 'operations_daily' },
                  { name: 'maintenance_work_orders.csv', badge: 'Fact · Event grain', stats: '7,761 rows · 22 columns · 18 months × 12 sites', desc: 'One row per maintenance work order. Captures maintenance type (Preventive/Corrective), failure category, priority level, technician, vendor, labor and parts costs, response and resolution times, and SLA breach flag. Core source for corrective ratio, SLA breach rate, and repair cost analysis.', cols: 'maintenance_type · failure_category · repair_cost_usd · sla_breach_flag · response_time_hours · repeat_failure_flag · priority_level', key: 'maintenance_work_orders' },
                  { name: 'assets.csv', badge: 'Dimension · Asset grain', stats: '540 rows · 21 columns · 12 sites · 5 asset types', desc: 'Asset registry with one row per physical asset. Includes install date, expected life, current age, condition score (0–100), criticality level, replacement cost, depreciated value, energy efficiency rating, and last maintenance date. Drives repair-vs-replace and asset lifecycle analysis.', cols: 'asset_type · condition_score · current_age_years · expected_life_years · replacement_cost_usd · asset_condition · criticality_level', key: 'assets' },
                  { name: 'finance_monthly.csv', badge: 'Fact · Monthly grain', stats: '864 rows · 11 columns · 18 months × 12 sites × 4 cost centers', desc: 'Monthly budget vs actual spend by site, cost center, and spend category (Power Opex, Capex Replacement, Maintenance Opex, Vendor Services). Includes variance USD, variance %, vendor name, and PO number. Every month shows positive variance — all 18 months are over budget.', cols: 'budget_usd · actual_spend_usd · variance_usd · variance_pct · spend_category · cost_center · vendor_name', key: 'finance_monthly' },
                  { name: 'customer_experience_monthly.csv', badge: 'Fact · Monthly grain', stats: '216 rows · 6 columns · 18 months × 12 sites', desc: "Monthly customer satisfaction survey results per site. Contains CSAT score (0–100), NPS score (−100 to +100), and survey response count. Used to quantify the customer impact of operational failures — DAL01's 74.9 CSAT directly correlates with its 99.678% availability.", cols: 'customer_satisfaction_score · nps_score · survey_response_count · year_month · site_code', key: 'customer_experience_monthly' },
                  { name: 'installed_customer_base_monthly.csv', badge: 'Fact · Monthly grain', stats: '216 rows · 7 columns · 18 months × 12 sites', desc: 'Monthly snapshot of installed customer counts, active cabinet utilisation, committed power in MW, and cross-connect counts per site. Tracks customer base growth and capacity consumption. Fleet grew from 976 to 1,066 installed customers (+9.2%) over the period.', cols: 'installed_customers_count · active_cabinets_count · committed_power_mw · cross_connects_count', key: 'installed_customer_base_monthly' },
                  { name: 'site_dim.csv', badge: 'Dimension · Site grain', stats: '12 rows · 9 columns · one row per site', desc: 'Site dimension table — the primary hub of the star schema. Contains site code (PK), region, country, city, site size, capacity MW, power redundancy rating, risk baseline index, and commissioned year. All fact tables join to this via site_code.', cols: 'site_code (PK) · region · city · capacity_mw · risk_baseline_index · power_redundancy · commissioned_year', key: 'site_dim' },
                  { name: 'date_dim.csv', badge: 'Dimension · Date grain', stats: '547 rows · 10 columns · Jan 1 2024 – Jun 30 2025', desc: 'Date dimension table — the second hub of the star schema. Contains calendar date (PK), year_month (secondary key for monthly grain tables), year, quarter, month number, month name, week of year, day of week, and is_weekend flag. Enables all time intelligence in Power BI.', cols: 'calendar_date (PK) · year_month · year · quarter · month_name · is_weekend', key: 'date_dim' },
                ].map(f => (
                  <div className="df-card" key={f.key}>
                    <div className="df-header"><div className="df-name">{f.name}</div><div className="df-badge">{f.badge}</div></div>
                    <div className="df-stats">{f.stats}</div>
                    <div className="df-desc">{f.desc}</div>
                    <div className="df-cols"><strong>Key columns:</strong> {f.cols}</div>
                    <a className="df-dl" href="#" onClick={e => e.preventDefault()}>↓ Download CSV</a>
                  </div>
                ))}
              </div>
            </div>
            <div className="hub-section">
              <div className="hub-section-head"><div className="hub-section-label">MySQL Star Schema — CREATE TABLE Statements</div><div className="hub-section-line"></div><div className="hub-section-count">Paste-ready SQL · equinix_ops_analytics database</div></div>
              <div className="sql-block"><pre>{`-- ═══════════════════════════════════════════════════════════════
-- DATABASE: equinix_ops_analytics
-- SCHEMA:   Star schema — 2 dimensions, 6 fact tables
-- AUTHOR:   Padmasree Sappa
-- ═══════════════════════════════════════════════════════════════

CREATE DATABASE IF NOT EXISTS equinix_ops_analytics;
USE equinix_ops_analytics;

-- ─── DIMENSION: Site ─────────────────────────────────────────
CREATE TABLE site_dim (
    site_code           VARCHAR(10)  PRIMARY KEY,
    region              VARCHAR(30)  NOT NULL,
    country             VARCHAR(30)  NOT NULL,
    city                VARCHAR(50)  NOT NULL,
    site_size           VARCHAR(5),
    capacity_mw         INT,
    power_redundancy    VARCHAR(5),
    risk_baseline_index DECIMAL(4,2),
    commissioned_year   INT
);

-- ─── DIMENSION: Date ─────────────────────────────────────────
CREATE TABLE date_dim (
    calendar_date   DATE         PRIMARY KEY,
    date_key        INT          UNIQUE NOT NULL,
    year            INT          NOT NULL,
    quarter         VARCHAR(3),
    month_num       INT,
    month_name      VARCHAR(10),
    year_month      VARCHAR(8)   NOT NULL,
    week_of_year    INT,
    day_of_week     VARCHAR(12),
    is_weekend      BOOLEAN
);

-- ─── FACT: Operations Daily ───────────────────────────────────
CREATE TABLE operations_daily (
    operations_date          DATE         NOT NULL,
    site_code                VARCHAR(10)  NOT NULL,
    region                   VARCHAR(30),
    incidents_total          INT,
    incidents_p1             INT,
    incidents_p2             INT,
    incidents_p3             INT,
    work_orders_opened       INT,
    corrective_work_orders   INT,
    downtime_hours_total     DECIMAL(8,2),
    sla_target_pct           DECIMAL(5,2),
    availability_pct         DECIMAL(8,3),
    sla_met_flag             TINYINT,
    capacity_utilization_pct DECIMAL(6,2),
    avg_hall_temperature_f   DECIMAL(6,2),
    power_usage_mw           DECIMAL(8,2),
    outage_flag              TINYINT,
    visitor_count            INT,
    customer_tickets_opened  INT,
    PRIMARY KEY (operations_date, site_code),
    FOREIGN KEY (site_code)       REFERENCES site_dim(site_code),
    FOREIGN KEY (operations_date) REFERENCES date_dim(calendar_date)
);

-- ─── FACT: Maintenance Work Orders ───────────────────────────
CREATE TABLE maintenance_work_orders (
    work_order_id         VARCHAR(15)  PRIMARY KEY,
    asset_id              VARCHAR(15)  NOT NULL,
    site_code             VARCHAR(10)  NOT NULL,
    region                VARCHAR(30),
    work_order_date       DATE         NOT NULL,
    maintenance_type      VARCHAR(20),
    failure_category      VARCHAR(40),
    failure_subcategory   VARCHAR(60),
    priority_level        VARCHAR(5),
    technician_id         VARCHAR(15),
    vendor_name           VARCHAR(50),
    labor_hours           DECIMAL(6,2),
    downtime_hours        DECIMAL(6,2),
    parts_cost_usd        INT,
    labor_cost_usd        INT,
    repair_cost_usd       INT,
    response_time_hours   DECIMAL(6,2),
    resolution_time_hours DECIMAL(8,2),
    status                VARCHAR(20),
    sla_breach_flag       TINYINT,
    repeat_failure_flag   TINYINT,
    year_month            VARCHAR(8),
    FOREIGN KEY (site_code)       REFERENCES site_dim(site_code),
    FOREIGN KEY (work_order_date) REFERENCES date_dim(calendar_date)
);

-- ─── FACT: Assets ────────────────────────────────────────────
CREATE TABLE assets (
    asset_id              VARCHAR(15)  PRIMARY KEY,
    site_code             VARCHAR(10)  NOT NULL,
    region                VARCHAR(30),
    asset_type            VARCHAR(20),
    manufacturer          VARCHAR(50),
    model_number          VARCHAR(50),
    serial_number         VARCHAR(30),
    install_date          DATE,
    commission_date       DATE,
    expected_life_years   INT,
    current_age_years     DECIMAL(5,2),
    asset_condition       VARCHAR(15),
    condition_score       DECIMAL(5,2),
    criticality_level     VARCHAR(10),
    capacity_rating       INT,
    capacity_unit         VARCHAR(10),
    replacement_cost_usd  INT,
    depreciated_value_usd INT,
    asset_status          VARCHAR(15),
    energy_efficiency_rating VARCHAR(5),
    last_maintenance_date DATE,
    FOREIGN KEY (site_code) REFERENCES site_dim(site_code)
);

-- ─── FACT: Finance Monthly ───────────────────────────────────
CREATE TABLE finance_monthly (
    year_month       VARCHAR(8)   NOT NULL,
    site_code        VARCHAR(10)  NOT NULL,
    region           VARCHAR(30),
    cost_center      VARCHAR(20),
    spend_category   VARCHAR(40),
    budget_usd       INT,
    actual_spend_usd INT,
    variance_usd     INT,
    variance_pct     DECIMAL(7,2),
    vendor_name      VARCHAR(50),
    po_number        VARCHAR(20),
    PRIMARY KEY (year_month, site_code, spend_category),
    FOREIGN KEY (site_code)  REFERENCES site_dim(site_code),
    FOREIGN KEY (year_month) REFERENCES date_dim(year_month)
);

-- ─── FACT: Customer Experience Monthly ───────────────────────
CREATE TABLE customer_experience_monthly (
    year_month                  VARCHAR(8)  NOT NULL,
    site_code                   VARCHAR(10) NOT NULL,
    region                      VARCHAR(30),
    survey_response_count       INT,
    customer_satisfaction_score DECIMAL(5,2),
    nps_score                   INT,
    PRIMARY KEY (year_month, site_code),
    FOREIGN KEY (site_code)  REFERENCES site_dim(site_code),
    FOREIGN KEY (year_month) REFERENCES date_dim(year_month)
);

-- ─── FACT: Installed Customer Base Monthly ────────────────────
CREATE TABLE installed_customer_base_monthly (
    year_month               VARCHAR(8)   NOT NULL,
    site_code                VARCHAR(10)  NOT NULL,
    region                   VARCHAR(30),
    installed_customers_count INT,
    active_cabinets_count    INT,
    committed_power_mw       DECIMAL(8,2),
    cross_connects_count     INT,
    PRIMARY KEY (year_month, site_code),
    FOREIGN KEY (site_code)  REFERENCES site_dim(site_code),
    FOREIGN KEY (year_month) REFERENCES date_dim(year_month)
);`}</pre></div>
            </div>
          </div>
        )}

        {/* Tab: How It Was Built */}
        {activeTab === 'builtnotes' && (
          <div className="hub-tab-content active">
            <div className="hub-section">
              <div className="hub-section-head"><div className="hub-section-label">How This Was Built</div><div className="hub-section-line"></div><div className="hub-section-count">Tech stack · Key decisions · Architecture rationale</div></div>
              <div className="build-grid">
                <div className="build-card">
                  <div className="build-num">TECH STACK</div>
                  <div className="build-title">Tools Used</div>
                  <div className="build-tags"><span className="btag btag-blue">MySQL</span><span className="btag btag-blue">Power BI Desktop</span><span className="btag btag-blue">DAX</span><span className="btag btag-green">HTML / CSS / JS</span><span className="btag btag-green">Chart.js</span><span className="btag btag-amber">Python</span><span className="btag btag-amber">Star Schema Design</span></div>
                  <ul className="build-list"><li><strong>MySQL</strong> — star schema database, 8 tables, 16K+ rows</li><li><strong>Power BI Desktop</strong> — semantic model, DAX measures, 6 report pages</li><li><strong>HTML/JS</strong> — SharePoint-style access hub with live filters</li><li><strong>Python</strong> — data generation, per-site aggregations, preprocessing</li></ul>
                </div>
                <div className="build-card">
                  <div className="build-num">ARCHITECTURE</div>
                  <div className="build-title">Why HTML + Power BI — not just one tool</div>
                  <ul className="build-list"><li><strong>Power BI Desktop</strong> = the analytics layer (model, DAX, dashboards)</li><li><strong>HTML hub</strong> = the access layer (what Matt described as a SharePoint-style repository)</li><li>Power BI Service requires an <strong>org Microsoft account</strong> to publish — not available for personal portfolio</li><li>In production: Power BI reports would be <strong>embedded into this hub via iframe</strong> after publishing to Power BI Service</li></ul>
                </div>
                <div className="build-card">
                  <div className="build-num">DATA MODEL</div>
                  <div className="build-title">Star schema — why not a flat table</div>
                  <ul className="build-list"><li><strong>Site + Date</strong> as dimension hubs — all 6 fact tables join through them</li><li>Enables <strong>cross-domain analysis</strong>: ops + finance + maintenance in one query</li><li>Required for <strong>DAX time intelligence</strong> (DATESMTD, DATEADD, etc.)</li><li>Follows <strong>Medallion pattern</strong>: Bronze (raw) → Silver (cleaned) → Gold (modelled)</li><li>Finance/Customer connect via <strong>year_month text key</strong> — different grain than daily ops</li></ul>
                </div>
                <div className="build-card">
                  <div className="build-num">KEY DECISION</div>
                  <div className="build-title">Composite Risk Score — weight rationale</div>
                  <div className="build-tags" style={{ marginBottom: 8 }}><span className="btag btag-red">Availability 25%</span><span className="btag btag-red">Incidents 20%</span><span className="btag btag-red">Downtime 20%</span><span className="btag btag-amber">SLA Breach 20%</span><span className="btag btag-neutral">Variance 15%</span></div>
                  <ul className="build-list"><li>Availability + downtime highest weight — <strong>direct customer SLA impact</strong></li><li>SLA breach = <strong>leading indicator</strong> of capacity problems</li><li>Spend variance lowest — <strong>lagging financial signal</strong>, not operational risk</li><li>Weights are <strong>adjustable</strong> via parameter table — no rebuild needed</li></ul>
                </div>
                <div className="build-card">
                  <div className="build-num">KEY DECISION</div>
                  <div className="build-title">Assets → Maintenance: no direct relationship</div>
                  <ul className="build-list"><li>Both tables connect to Site — creates an <strong>ambiguous path</strong> in Power BI</li><li>Power BI raises an error: two routes from Maintenance to Site</li><li>Solution: <strong>DAX FILTER by asset_id</strong> instead of a model relationship</li><li>This is the <strong>correct production pattern</strong> for this schema shape</li></ul>
                </div>
                <div className="build-card">
                  <div className="build-num">IMPORTANT CONTEXT</div>
                  <div className="build-title">Why SLA met rate shows 28.7% — not a data error</div>
                  <ul className="build-list"><li>SLA target = <strong>99.9% availability</strong> per day</li><li>Fleet average = 99.78% — strong performance but <strong>technically below target daily</strong></li><li>So <code>sla_met_flag = 0</code> on most days even when performance is good</li><li>28.7% reflects the genuine difficulty of <strong>hitting 99.9% every single day</strong></li><li>Always explain this to stakeholders — looks alarming without context</li></ul>
                </div>
                <div className="build-card">
                  <div className="build-num">PRODUCTION PATH</div>
                  <div className="build-title">What would change in a live deployment</div>
                  <ul className="build-list"><li>Static embedded data → <strong>live API calls</strong> to MySQL database</li><li>Power BI Desktop → <strong>published to Power BI Service</strong> with scheduled refresh</li><li>HTML hub embeds reports via <strong>Power BI REST API iframe</strong></li><li>Python risk scoring runs on <strong>scheduled job</strong>, writes back to DB</li><li>Current build = full logic + architecture. Production wiring = <strong>deployment step, not a redesign</strong></li></ul>
                </div>
                <div className="build-card">
                  <div className="build-num">FILTER DESIGN</div>
                  <div className="build-title">Multi-select filter architecture</div>
                  <ul className="build-list"><li>Rebuilt from single-select to <strong>multi-select checkboxes</strong> — allows DAL01 vs ASH01 comparison</li><li><strong>Per-site monthly data</strong> pre-computed and embedded (Python aggregations)</li><li><code>getMonthlySeries()</code> picks correct scope: site → region → fleet</li><li>Count metrics <strong>summed</strong>, rate metrics <strong>averaged</strong> — no averaging-of-averages distortion</li></ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: How to Use */}
        {activeTab === 'howto' && (
          <div className="hub-tab-content active">
            <div className="hub-section">
              <div className="hub-section-head"><div className="hub-section-label">Getting Started Guide</div><div className="hub-section-line"></div></div>
              <div className="howto-grid">
                <div className="howto-card"><div className="howto-step">1</div><div className="howto-title">Start with the Executive Overview</div><div className="howto-desc">The Overview dashboard gives you fleet-level KPIs, active decision alerts, and a site risk summary table. Use it as your daily health check before reviewing individual site detail.</div></div>
                <div className="howto-card"><div className="howto-step">2</div><div className="howto-title">Use Filters to Scope Your View</div><div className="howto-desc">Every dashboard has Region, Site, and Period filters at the top. All charts and KPIs update dynamically with your selection. Use filters to drill down on a specific site or time range without navigating away.</div></div>
                <div className="howto-card"><div className="howto-step">3</div><div className="howto-title">Follow the Decision Alerts</div><div className="howto-desc">Red and amber decision cards on every page tell you What is happening, Why it is happening, and What action to take. These are derived analytically from the data — not static text. Click them to navigate to the relevant view.</div></div>
                <div className="howto-card"><div className="howto-step">4</div><div className="howto-title">Drill into Site Risk</div><div className="howto-desc">The Site Risk Intelligence view provides a composite risk score for all 12 sites with a ranked scorecard. Sites flagged in red require leadership review. Click any site row in the table to filter all charts to that site.</div></div>
                <div className="howto-card"><div className="howto-step">5</div><div className="howto-title">Review Asset Replacement Candidates</div><div className="howto-desc">The Asset Intelligence view lists assets past cost-efficiency threshold. The Repair-to-Replace ratio tells you whether continued maintenance costs more than replacement. Use this to prioritize capital review discussions.</div></div>
                <div className="howto-card"><div className="howto-step">6</div><div className="howto-title">Export or Share Findings</div><div className="howto-desc">Use the action buttons within each dashboard to export insight reports or copy share links. The Insights tab on this Hub page provides a current narrative summary suitable for leadership briefings or email updates.</div></div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Ownership */}
        {activeTab === 'ownership' && (
          <div className="hub-tab-content active">
            <div className="hub-section">
              <div className="hub-section-head"><div className="hub-section-label">Roles &amp; Responsibilities</div><div className="hub-section-line"></div></div>
              <div className="owner-grid">
                <div className="owner-card"><div className="owner-role">Analytics Owner</div><div className="owner-name">Padmasree Sappa</div><div className="owner-team">Analytics &amp; Communications Specialist</div><div className="owner-scope">Dashboard development, data model design, KPI definitions, insight generation, data validation, stakeholder communication</div></div>
                <div className="owner-card"><div className="owner-role">Solution Type</div><div className="owner-name">Portfolio Project</div><div className="owner-team">End-to-end Analytics System</div><div className="owner-scope">Independently designed and built — data modelling, SQL integration, Power BI semantic layer, HTML/JS access hub, insight narrative, communication layer</div></div>
                <div className="owner-card"><div className="owner-role">Primary Audience</div><div className="owner-name">Operations Leadership</div><div className="owner-team">Finance · Engineering · Regional Ops Teams</div><div className="owner-scope">Dashboard consumers, data feedback providers, action-takers based on decision alerts and insight cards</div></div>
                <div className="owner-card"><div className="owner-role">Data Sources</div><div className="owner-name">Operations, Maintenance, Finance</div><div className="owner-team">Asset Management · Customer · Installed Base</div><div className="owner-scope">MySQL database · 8 structured tables · Star schema design · CSV batch load · 18-month dataset (Jan 2024 – Jun 2025)</div></div>
                <div className="owner-card"><div className="owner-role">Refresh Cadence</div><div className="owner-name">Monthly (primary)</div><div className="owner-team">Daily grain available for operations data</div><div className="owner-scope">Finance and Customer tables: monthly · Operations table: daily grain available · Maintenance: event-driven</div></div>
                <div className="owner-card"><div className="owner-role">Built With</div><div className="owner-name">MySQL · Power BI Desktop · HTML / JS</div><div className="owner-team">Python · Chart.js · Star Schema Design</div><div className="owner-scope">Data integration → Semantic model → DAX measures → Dashboard layer → Access hub → Communication layer</div></div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
