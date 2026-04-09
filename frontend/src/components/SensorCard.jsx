// src/components/SensorCard.jsx

const icons = {
  moisture: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 4 C16 4, 7 16, 7 21 C7 26, 11 29, 16 29 C21 29, 25 26, 25 21 C25 16, 16 4 16 4Z" fill="#4fc3f7" opacity="0.9"/>
      <path d="M16 6 C16 6, 9 17, 9 21 C9 24.5, 12 27, 16 27" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),
  temperature: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="13" y="4" width="6" height="16" rx="3" fill="#ef9a9a"/>
      <circle cx="16" cy="23" r="5" fill="#e53935"/>
      <rect x="14.5" y="8" width="3" height="12" rx="1.5" fill="#ef5350" opacity="0.7"/>
      <line x1="19" y1="9" x2="22" y2="9" stroke="#e57373" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="19" y1="13" x2="22" y2="13" stroke="#e57373" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="19" y1="17" x2="22" y2="17" stroke="#e57373" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  humidity: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 5 C16 5, 8 14, 8 19 C8 23.4, 11.6 27, 16 27 C20.4 27, 24 23.4, 24 19 C24 14, 16 5 16 5Z" fill="#80deea" opacity="0.85"/>
      <circle cx="13" cy="18" r="2" fill="#fff" opacity="0.5"/>
      <path d="M12 22 C14 20, 18 21, 20 19" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
    </svg>
  ),
  light: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="6" fill="#ffd54f"/>
      <line x1="16" y1="4" x2="16" y2="7" stroke="#ffb300" strokeWidth="2" strokeLinecap="round"/>
      <line x1="16" y1="25" x2="16" y2="28" stroke="#ffb300" strokeWidth="2" strokeLinecap="round"/>
      <line x1="4" y1="16" x2="7" y2="16" stroke="#ffb300" strokeWidth="2" strokeLinecap="round"/>
      <line x1="25" y1="16" x2="28" y2="16" stroke="#ffb300" strokeWidth="2" strokeLinecap="round"/>
      <line x1="7.8" y1="7.8" x2="10" y2="10" stroke="#ffb300" strokeWidth="2" strokeLinecap="round"/>
      <line x1="22" y1="22" x2="24.2" y2="24.2" stroke="#ffb300" strokeWidth="2" strokeLinecap="round"/>
      <line x1="24.2" y1="7.8" x2="22" y2="10" stroke="#ffb300" strokeWidth="2" strokeLinecap="round"/>
      <line x1="10" y1="22" x2="7.8" y2="24.2" stroke="#ffb300" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
};

const SensorCard = ({ type, value, unit, label }) => {
  const isLight = type === "light";

  return (
    <div style={styles.card}>
      <div style={styles.top}>
        <span>{icons[type]}</span>
        <span style={{ ...styles.value, fontSize: isLight ? "18px" : "28px" }}>
          {value}
          {unit && <span style={styles.unit}>{unit}</span>}
        </span>
      </div>
      <div style={styles.divider} />
      <p style={styles.label}>{label}</p>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "16px 20px",
    minWidth: "140px",
    flex: 1,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  top: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  value: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1a1a1a",
    lineHeight: 1,
  },
  unit: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#555",
    marginLeft: "2px",
  },
  divider: {
    height: "2px",
    backgroundColor: "#e8f5e9",
    borderRadius: "2px",
  },
  label: {
    margin: 0,
    fontSize: "13px",
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    letterSpacing: "0.3px",
  },
};

export default SensorCard;