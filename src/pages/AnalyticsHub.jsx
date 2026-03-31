import { useState } from "react";

export default function AnalyticsHub({ onClose }) {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0, position: "fixed", inset: 0, zIndex: 9999 }}>
      {loading && (
        <div style={{
          position: "fixed", inset: 0, background: "#0d2240",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
          <div style={{
            width: 40, height: 40, border: "3px solid rgba(255,255,255,.2)",
            borderTop: "3px solid #1a56db", borderRadius: "50%",
            animation: "spin 0.8s linear infinite"
          }}/>
          <p style={{ color: "#9ca3af", marginTop: 16, fontFamily: "sans-serif", fontSize: 13 }}>
            Loading Analytics Hub...
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
      <iframe
        src="/Operations_Analytics_Hub.html"
        onLoad={() => setLoading(false)}
        style={{ width: "100%", height: "100%", border: "none", display: "block" }}
        title="Operations Analytics Hub"
      />
    </div>
  );
}