const getStyle = (status) => {
  if (!status) return { bg: "#78909c", isGreen: false };
  const s = status.toLowerCase();
  if (s.includes("healthy")) return { bg: null, isGreen: true };
  if (s.includes("water"))   return { bg: "#e53935", isGreen: false };
  if (s.includes("light"))   return { bg: "#f57c00", isGreen: false };
  if (s.includes("heat") || s.includes("cold")) return { bg: "#ef6c00", isGreen: false };
  if (s.includes("misting") || s.includes("dry")) return { bg: "#6d4c41", isGreen: false };
  return                            { bg: "#78909c", isGreen: false };
};

const DryPlantIcon = () => (
  <svg width="54" height="54" viewBox="0 0 54 54" fill="none" style={{ flexShrink: 0 }}>
    {/* cracked dry ground */}
    <ellipse cx="27" cy="46" rx="14" ry="4" fill="rgba(0,0,0,0.18)"/>
    <path d="M16 44 C17 43, 19 44, 20 43" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    <path d="M22 45 C23 43.5, 25 44.5, 26 43" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    <path d="M30 44 C31 42.5, 33 43.5, 34 42" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    {/* stem — slightly drooping */}
    <path d="M27 44 C27 38, 26 30, 25 22" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    {/* left drooping leaf */}
    <path d="M25 30 C18 26, 12 28, 10 34 C16 32, 21 31, 25 33Z" fill="rgba(255,255,255,0.75)"/>
    <path d="M25 30 C20 31, 15 32, 10 34" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" fill="none"/>
    {/* right drooping leaf */}
    <path d="M25 24 C32 19, 38 20, 41 26 C35 23, 29 23, 25 26Z" fill="rgba(255,255,255,0.6)"/>
    <path d="M25 24 C30 23, 36 23, 41 26" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" fill="none"/>
    {/* top wilted tip */}
    <path d="M25 22 C24 17, 22 14, 20 12" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" fill="none"/>
    {/* water drop with X — no water */}
    <path d="M42 8 C42 8, 38 13, 38 15.5 C38 17.4, 39.8 19, 42 19 C44.2 19, 46 17.4, 46 15.5 C46 13, 42 8 42 8Z" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
    <line x1="40" y1="12" x2="44" y2="16" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="44" y1="12" x2="40" y2="16" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const HealthyPlantIcon = () => (
  <svg width="54" height="54" viewBox="0 0 54 54" fill="none" style={{ flexShrink: 0 }}>
    {/* soil mound */}
    <ellipse cx="27" cy="46" rx="14" ry="4.5" fill="rgba(0,0,0,0.18)"/>
    {/* main stem */}
    <path d="M27 45 C27 38, 27 30, 27 18" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    {/* big left leaf */}
    <path d="M27 34 C22 28, 12 26, 8 30 C10 36, 18 38, 27 36Z" fill="rgba(255,255,255,0.85)"/>
    <path d="M27 34 C20 33, 13 32, 8 30" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeLinecap="round"/>
    {/* big right leaf */}
    <path d="M27 26 C32 20, 42 18, 46 22 C44 28, 36 30, 27 28Z" fill="rgba(255,255,255,0.75)"/>
    <path d="M27 26 C34 24, 41 22, 46 22" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round"/>
    {/* small left leaf near top */}
    <path d="M27 20 C23 15, 16 14, 14 17 C17 21, 22 22, 27 21Z" fill="rgba(255,255,255,0.7)"/>
    <path d="M27 20 C22 18, 17 16, 14 17" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.9" strokeLinecap="round"/>
    {/* top shoot */}
    <path d="M27 18 C27 14, 28 10, 30 7" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" fill="none"/>
    {/* tiny top leaf */}
    <path d="M30 7 C33 4, 38 4, 39 7 C36 9, 32 9, 30 7Z" fill="rgba(255,255,255,0.65)"/>
  </svg>
);

const LowLightIcon = () => (
  <svg width="54" height="54" viewBox="0 0 54 54" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="27" cy="20" r="8" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
    <line x1="27" y1="8" x2="27" y2="11" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="15" y1="20" x2="18" y2="20" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="36" y1="20" x2="39" y2="20" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="18.5" y1="11.5" x2="20.6" y2="13.6" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="35.5" y1="11.5" x2="33.4" y2="13.6" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" strokeLinecap="round"/>
    {/* cloud blocking */}
    <path d="M14 30 C14 26, 17 24, 21 25 C22 22, 25 20, 29 21 C33 22, 35 25, 34 28 C36 28, 38 30, 37 32 C36 34, 14 34, 14 32 C13 32, 12 31, 14 30Z" fill="rgba(255,255,255,0.45)"/>
    <path d="M27 42 L27 36" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M23 46 L27 42 L31 46" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const getIcon = (status) => {
  if (!status) return null;
  const s = status.toLowerCase();
  if (s.includes("healthy")) return <HealthyPlantIcon />;
  if (s.includes("water"))   return <DryPlantIcon />;
  if (s.includes("light"))   return <LowLightIcon />;
  if (s.includes("heat") || s.includes("cold") || s.includes("misting") || s.includes("dry")) return <DryPlantIcon />;
  return <HealthyPlantIcon />;
};

const SoilStatus = ({ status }) => {
  const { bg, isGreen } = getStyle(status);

  return (
    <div style={{
      ...styles.banner,
      background: isGreen
        ? "linear-gradient(135deg, #4caf50 0%, #66bb6a 50%, #81c784 100%)"
        : bg,
    }}>
      {isGreen && <div style={styles.waveBg} />}
      <div style={styles.inner}>
        {getIcon(status)}
        <p style={styles.message}>{status || "Loading..."}</p>
      </div>
    </div>
  );
};

const styles = {
  banner: {
    position: "relative",
    borderRadius: "18px",
    padding: "28px 36px",
    overflow: "hidden",
    boxShadow: "0 4px 18px rgba(76, 175, 80, 0.2)",
  },
  waveBg: {
    position: "absolute",
    bottom: "-30px",
    right: "-30px",
    width: "220px",
    height: "220px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
    pointerEvents: "none",
  },
  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    position: "relative",
    zIndex: 1,
  },
  message: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "700",
    color: "#fff",
    letterSpacing: "0.2px",
    textShadow: "0 1px 4px rgba(0,0,0,0.12)",
  },
};

export default SoilStatus;