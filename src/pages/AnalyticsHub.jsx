import { useState, useRef, useEffect } from "react";
import "./hub/hub.css";
import HubView       from "./hub/HubView";
import DashboardView from "./hub/DashboardView";

export default function AnalyticsHub({ onClose }) {
  const [activeView, setActiveView] = useState('hub');      // 'hub' | 'dashboards'
  const [activePage, setActivePage] = useState('overview'); // dashboard page
  const [toast, setToast] = useState({ msg: '', type: 'blue', visible: false });
  const toastTimer = useRef(null);

  const showToast = (msg, type = 'blue') => {
    clearTimeout(toastTimer.current);
    setToast({ msg, type, visible: true });
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 2800);
  };

  const switchView = (v) => setActiveView(v);

  const navDB = (page) => {
    setActivePage(page);
    setActiveView('dashboards');
  };

  return (
    <div className="hub-root" style={{ minHeight: '100vh' }}>

      {/* Topbar */}
      <div className="topbar">
        <div className="brand" onClick={() => switchView('hub')} style={{ cursor: 'pointer' }}>
          <div className="eq-mark">EQ</div>
          <div>
            <div className="brand-name">Operations Analytics Hub</div>
            <div className="brand-sub">Americas · 12 Sites · Decision Support System</div>
          </div>
        </div>
        <div className="topbar-nav">
          <button className={`tnav-btn${activeView === 'hub' ? ' active' : ''}`} onClick={() => switchView('hub')}>Hub</button>
          <button className={`tnav-btn${activeView === 'dashboards' ? ' active' : ''}`} onClick={() => switchView('dashboards')}>Dashboards</button>
        </div>
        <div className="topbar-right">
          <div className="live-badge"><div className="ldot"></div>LIVE</div>
          <div className="period-label">JAN 2024 – JUN 2025</div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 6,
              padding: '5px 12px',
              fontSize: 11,
              fontFamily: 'sans-serif',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              marginLeft: 8,
            }}
          >
            ← Portfolio
          </button>
        </div>
      </div>

      {/* Views */}
      {activeView === 'hub' && (
        <HubView
          onSwitchToDashboard={() => switchView('dashboards')}
          onNavDB={navDB}
        />
      )}
      {activeView === 'dashboards' && (
        <DashboardView
          activePage={activePage}
          onNavDB={navDB}
          onSwitchToHub={() => switchView('hub')}
          showToast={showToast}
        />
      )}

      {/* Toast */}
      <div className={`toast ${toast.type}${toast.visible ? ' show' : ''}`}>{toast.msg}</div>

    </div>
  );
}
