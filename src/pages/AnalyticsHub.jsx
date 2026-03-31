export default function AnalyticsHub({ onClose }) {
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      
      {/* 🔹 Back Button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          padding: "10px 16px",
          background: "#0f172a",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        ← Back to Portfolio
      </button>

      {/* 🔹 Iframe */}
      <iframe
        src="/Operations_Analytics_Hub.html"
        title="Operations Analytics Hub"
        style={{
          width: "100%",
          height: "100%",
          border: "none"
        }}
      />
    </div>
  );
}