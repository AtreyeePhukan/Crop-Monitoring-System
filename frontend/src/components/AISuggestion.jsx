// src/components/AISuggestion.jsx
import { useState } from "react";

const AISuggestion = ({ soil, temperature, humidity, light }) => {
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isInvalidData =
    soil === "--" ||
    temperature === "--" ||
    humidity === "--" ||
    light === "--" ||
    soil === undefined ||
    temperature === undefined ||
    humidity === undefined ||
    light === undefined ||
    isNaN(Number(soil)) ||
    isNaN(Number(temperature)) ||
    isNaN(Number(humidity));

  const fetchSuggestion = async () => {
    if (isInvalidData) {
      setError("Sensor data is not ready yet. Please wait a moment.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        soil: Number(soil),
        temperature: Number(temperature),
        humidity: Number(humidity),
        light: String(light),
      };

      console.log("Sending suggestion payload:", payload);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/suggestion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setSuggestion(data.suggestion);
      }
    } catch (err) {
      setError("Could not reach the server. Is your backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={{ fontSize: "20px", lineHeight: 1 }}>🌿</span>
          <h3 style={styles.title}>Plant Suggestion</h3>
        </div>
      </div>

      <div style={styles.divider} />

      {/* Button */}
      <div style={styles.buttonRow}>
        <button
          style={{
            ...styles.button,
            opacity: loading || isInvalidData ? 0.7 : 1,
            cursor: loading || isInvalidData ? "not-allowed" : "pointer",
          }}
          onClick={fetchSuggestion}
          disabled={loading || isInvalidData}
        >
          {loading ? "Analyzing your plant data..." : "Get Plant Suggestion"}
        </button>
      </div>

      {/* Result */}
      {(suggestion || error) && (
        <div style={{
          ...styles.resultBox,
          borderColor: error ? "#ffcdd2" : "#c8e6c9",
          background: error ? "#fff8f8" : "#f1f8e9",
        }}>
          {error ? (
            <p style={{ ...styles.resultText, color: "#c62828" }}>⚠️ {error}</p>
          ) : (
            <>
              <div style={styles.resultHeader}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6.5" fill="#e8f5e9" stroke="#4caf50" strokeWidth="1"/>
                  <path d="M4 7 L6 9 L10 5" stroke="#4caf50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
                <span style={styles.resultLabel}>Recommendation</span>
              </div>
              <p style={styles.resultText}>{suggestion}</p>
            </>
          )}
        </div>
      )}

      {/* Placeholder when nothing has been fetched yet */}
      {!suggestion && !error && (
        <p style={styles.placeholder}>
          Click the button to get a personalized suggestion based on your current sensor data.
        </p>
      )}

    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    padding: "24px 28px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  title: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
    color: "#1b5e20",
  },
  poweredBy: {
    fontSize: "11px",
    color: "#aaa",
    fontStyle: "italic",
  },
  divider: {
    height: "1px",
    backgroundColor: "#e8f5e9",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#2e7d32",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "12px 32px",
    fontSize: "15px",
    fontWeight: "600",
    letterSpacing: "0.3px",
    transition: "background 0.2s ease",
  },
  resultBox: {
    borderRadius: "12px",
    padding: "16px 18px",
    border: "1px solid",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  resultHeader: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  resultLabel: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#388e3c",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  resultText: {
    margin: 0,
    fontSize: "14px",
    color: "#333",
    lineHeight: "1.7",
    whiteSpace: "pre-line",
  },
  placeholder: {
    margin: 0,
    fontSize: "13px",
    color: "#aaa",
    textAlign: "center",
    lineHeight: "1.6",
  },
};

export default AISuggestion;