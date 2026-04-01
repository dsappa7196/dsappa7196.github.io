import { DATA, FLEET_MO, SITE_MO, REGION_MO, FLEET_MAINT, MAINT_MO } from "./hubData";

export function getFilteredSites(activeFilters) {
  return DATA.sites.filter(s => {
    if (activeFilters.sites.length   && !activeFilters.sites.includes(s.code))     return false;
    if (activeFilters.regions.length && !activeFilters.regions.includes(s.region)) return false;
    return true;
  });
}

export function getFilteredMonths(activeFilters) {
  return DATA.months.map((m, i) => ({ i, m })).filter(({ m }) => {
    if (activeFilters.period === '2024' && !m.includes('-24')) return false;
    if (activeFilters.period === '2025' && !m.includes('-25')) return false;
    return true;
  });
}

export function getMonthlySeries(key, activeFilters) {
  if (activeFilters.sites.length === 1) {
    const s = activeFilters.sites[0];
    return (SITE_MO[s] && SITE_MO[s][key]) ? SITE_MO[s][key] : [];
  }
  if (activeFilters.sites.length > 1) {
    const numMonths = FLEET_MO[key] ? FLEET_MO[key].length : 18;
    const result = [];
    const isAvg = ['avail', 'cap', 'csat'].includes(key);
    for (let i = 0; i < numMonths; i++) {
      const vals = activeFilters.sites
        .map(s => SITE_MO[s] && SITE_MO[s][key] ? SITE_MO[s][key][i] : null)
        .filter(v => v !== null);
      result.push(vals.length
        ? (isAvg ? vals.reduce((a, b) => a + b, 0) / vals.length : vals.reduce((a, b) => a + b, 0))
        : null);
    }
    return result;
  }
  if (activeFilters.regions.length === 1) {
    const r = activeFilters.regions[0];
    return (REGION_MO[r] && REGION_MO[r][key]) ? REGION_MO[r][key] : FLEET_MO[key] || [];
  }
  return FLEET_MO[key] || [];
}

export function getMaintSeries(key, activeFilters) {
  if (activeFilters.sites.length === 1) {
    const s = activeFilters.sites[0];
    return (MAINT_MO[s] && MAINT_MO[s][key]) ? MAINT_MO[s][key] : [];
  }
  if (activeFilters.sites.length > 1) {
    const numMonths = FLEET_MAINT[key] ? FLEET_MAINT[key].length : 18;
    const result = [];
    for (let i = 0; i < numMonths; i++) {
      const vals = activeFilters.sites
        .map(s => MAINT_MO[s] && MAINT_MO[s][key] ? MAINT_MO[s][key][i] : null)
        .filter(v => v !== null);
      result.push(vals.length ? vals.reduce((a, b) => a + b, 0) : null);
    }
    return result;
  }
  return FLEET_MAINT[key] || [];
}
