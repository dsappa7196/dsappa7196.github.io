import { useState, useRef, useEffect } from "react";
import PageOverview    from "./pages/PageOverview";
import PageRisk        from "./pages/PageRisk";
import PageAssets      from "./pages/PageAssets";
import PageFinance     from "./pages/PageFinance";
import PageMaintenance from "./pages/PageMaintenance";
import PageCustomer    from "./pages/PageCustomer";

const REGIONS = ['AMER-East', 'AMER-West', 'AMER-Central'];
const SITES = [
  { code: 'ASH01', city: 'Ashburn' },
  { code: 'ATL01', city: 'Atlanta' },
  { code: 'CHI01', city: 'Chicago' },
  { code: 'DAL01', city: 'Dallas' },
  { code: 'DEN01', city: 'Denver' },
  { code: 'LAX01', city: 'Los Angeles' },
  { code: 'MIA01', city: 'Miami' },
  { code: 'NYC01', city: 'New York' },
  { code: 'PHX01', city: 'Phoenix' },
  { code: 'SEA01', city: 'Seattle' },
  { code: 'SJC01', city: 'San Jose' },
  { code: 'TOR01', city: 'Toronto' },
];

const PAGES = [
  { id: 'overview',    label: 'Overview' },
  { id: 'risk',        label: 'Site Risk' },
  { id: 'assets',      label: 'Asset Intel' },
  { id: 'finance',     label: 'Finance' },
  { id: 'maintenance', label: 'Maintenance' },
  { id: 'customer',    label: 'Customer' },
];

function getFilterContext(filters) {
  const siteStr   = filters.sites.length   ? filters.sites.join(', ')   : 'All Sites';
  const regionStr = filters.regions.length ? filters.regions.join(', ') : 'All Regions';
  const periodStr = filters.period === '2024' ? '2024 Only' : filters.period === '2025' ? '2025 Only' : 'Full Period';
  return `${siteStr} · ${regionStr} · ${periodStr}`;
}

export default function DashboardView({ activePage, onNavDB, onSwitchToHub, showToast }) {
  const [activeFilters, setActiveFilters] = useState({ sites: [], regions: [], period: '' });
  const [openDropdown, setOpenDropdown] = useState(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!openDropdown) return;
    const handler = (e) => {
      if (!e.target.closest('.ms-wrap')) setOpenDropdown(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [openDropdown]);

  const toggleRegion = (r) => {
    setActiveFilters(f => {
      const next = f.regions.includes(r) ? f.regions.filter(x => x !== r) : [...f.regions, r];
      return { ...f, regions: next };
    });
  };
  const toggleSite = (s) => {
    setActiveFilters(f => {
      const next = f.sites.includes(s) ? f.sites.filter(x => x !== s) : [...f.sites, s];
      return { ...f, sites: next };
    });
  };
  const setPeriod = (p) => {
    setActiveFilters(f => ({ ...f, period: p }));
  };
  const clearFilters = () => {
    setActiveFilters({ sites: [], regions: [], period: '' });
    setOpenDropdown(null);
  };

  const hasFilters = activeFilters.sites.length > 0 || activeFilters.regions.length > 0 || activeFilters.period !== '';

  const regionLbl = activeFilters.regions.length ? activeFilters.regions.join(', ') : 'All Regions';
  const siteLbl   = activeFilters.sites.length   ? activeFilters.sites.join(', ')   : 'All 12 Sites';
  const periodLbl = activeFilters.period === '2024' ? '2024 Only' : activeFilters.period === '2025' ? '2025 Only' : 'Full Period';

  return (
    <>
      <div className="db-topbar">
        <div className="db-nav">
          {PAGES.map(p => (
            <button
              key={p.id}
              className={`dbnav-btn${activePage === p.id ? ' active' : ''}`}
              onClick={() => onNavDB(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>
        <button className="db-hub-btn" onClick={onSwitchToHub}>← Hub</button>
      </div>

      <div className="filter-bar">
        <span className="filter-label">Filter:</span>

        {/* Region */}
        <div className="ms-wrap" id="ms-region">
          <div className="ms-btn" onClick={() => setOpenDropdown(openDropdown === 'region' ? null : 'region')}>
            <span>{regionLbl}</span>
            <span className="ms-arrow">▾</span>
          </div>
          {openDropdown === 'region' && (
            <div className="ms-drop" style={{ display: 'block' }}>
              {REGIONS.map(r => (
                <label key={r} className="ms-opt">
                  <input type="checkbox" value={r} checked={activeFilters.regions.includes(r)} onChange={() => toggleRegion(r)} />
                  {' '}{r}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Site */}
        <div className="ms-wrap" id="ms-site">
          <div className="ms-btn" onClick={() => setOpenDropdown(openDropdown === 'site' ? null : 'site')}>
            <span>{siteLbl}</span>
            <span className="ms-arrow">▾</span>
          </div>
          {openDropdown === 'site' && (
            <div className="ms-drop" style={{ display: 'block' }}>
              {SITES.map(s => (
                <label key={s.code} className="ms-opt">
                  <input type="checkbox" value={s.code} checked={activeFilters.sites.includes(s.code)} onChange={() => toggleSite(s.code)} />
                  {' '}{s.code} — {s.city}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Period */}
        <div className="ms-wrap" id="ms-period">
          <div className="ms-btn" onClick={() => setOpenDropdown(openDropdown === 'period' ? null : 'period')}>
            <span>{periodLbl}</span>
            <span className="ms-arrow">▾</span>
          </div>
          {openDropdown === 'period' && (
            <div className="ms-drop" style={{ display: 'block' }}>
              {[{ val: '', label: 'Full Period' }, { val: '2024', label: '2024 Only' }, { val: '2025', label: '2025 Only' }].map(opt => (
                <label key={opt.val} className="ms-opt ms-radio">
                  <input type="radio" name="fPeriodR" value={opt.val} checked={activeFilters.period === opt.val} onChange={() => setPeriod(opt.val)} />
                  {' '}{opt.label}
                </label>
              ))}
            </div>
          )}
        </div>

        {hasFilters && (
          <button className="filter-clear" onClick={clearFilters}>✕ Clear All</button>
        )}
        <div className="filter-spacer"></div>
        <span className="filter-context">{getFilterContext(activeFilters)}</span>
      </div>

      {/* Pages — conditional render so charts init on mount and destroy on unmount */}
      {activePage === 'overview'    && <PageOverview    activeFilters={activeFilters} onNav={onNavDB} showToast={showToast} />}
      {activePage === 'risk'        && <PageRisk        activeFilters={activeFilters} showToast={showToast} />}
      {activePage === 'assets'      && <PageAssets      activeFilters={activeFilters} showToast={showToast} />}
      {activePage === 'finance'     && <PageFinance     activeFilters={activeFilters} showToast={showToast} />}
      {activePage === 'maintenance' && <PageMaintenance activeFilters={activeFilters} showToast={showToast} />}
      {activePage === 'customer'    && <PageCustomer    activeFilters={activeFilters} showToast={showToast} />}
    </>
  );
}
