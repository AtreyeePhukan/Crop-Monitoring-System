import useSensorData from "./hooks/useSensorData";
import SensorCard from "./components/SensorCard";
import SoilStatus from "./components/SoilStatus";
import AISuggestion from "./components/AISuggestion";

const formatLastUpdated = (date) => {
  if (!date) return "Never";
  const diff = Math.floor((new Date() - date) / 1000);
  if (diff < 60) return `${diff} secs ago`;
  return `${Math.floor(diff / 60)} mins ago`;
};


const formatLight = (val) => {
  if (!val && val !== 0) return "—";
  const s = String(val).toUpperCase();
  if (s === "BRIGHT" || s === "1") return "Bright";
  if (s === "DARK"   || s === "0") return "Dark";
  return String(val);
};

const LeafTopLeft = () => (
  <svg
    style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
    width="200" height="200" viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="ltl1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a5d6a7"/>
        <stop offset="100%" stopColor="#388e3c"/>
      </linearGradient>
      <linearGradient id="ltl2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#c8e6c9"/>
        <stop offset="100%" stopColor="#66bb6a"/>
      </linearGradient>
    </defs>
    <ellipse cx="55" cy="75" rx="90" ry="80" fill="#c8e6c9" opacity="0.3"/>
    <path d="M10 170 C-10 90, 65 -15, 135 25 C90 35, 58 88, 10 170Z" fill="url(#ltl2)" opacity="0.65"/>
    <path d="M12 165 C42 122, 82 72, 130 27" fill="none" stroke="#4caf50" strokeWidth="1.2" opacity="0.45"/>
    <path d="M38 128 C56 112, 62 92, 58 76" fill="none" stroke="#4caf50" strokeWidth="0.8" opacity="0.4"/>
    <path d="M64 88 C80 72, 86 55, 84 40" fill="none" stroke="#4caf50" strokeWidth="0.8" opacity="0.4"/>
    <path d="M-5 148 C-22 65, 55 -25, 125 15 C78 30, 42 80, -5 148Z" fill="url(#ltl1)" opacity="0.88"/>
    <path d="M-3 144 C28 100, 68 52, 122 18" fill="none" stroke="#2e7d32" strokeWidth="1.5" opacity="0.5"/>
    <path d="M24 108 C44 94, 50 74, 46 58" fill="none" stroke="#2e7d32" strokeWidth="0.9" opacity="0.4"/>
    <path d="M52 72 C68 58, 74 40, 72 26" fill="none" stroke="#2e7d32" strokeWidth="0.9" opacity="0.4"/>
    <path d="M-5 148 C8 126, 22 100, 42 74" fill="none" stroke="#2e7d32" strokeWidth="2.2" strokeLinecap="round" opacity="0.55"/>
  </svg>
);

const LeafBottomRight = () => (
  <svg
    style={{ position: "absolute", bottom: 0, right: 0, pointerEvents: "none" }}
    width="240" height="240" viewBox="0 0 240 240"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="lbr1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#81c784"/>
        <stop offset="100%" stopColor="#2e7d32"/>
      </linearGradient>
      <linearGradient id="lbr2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#c8e6c9"/>
        <stop offset="100%" stopColor="#66bb6a"/>
      </linearGradient>
    </defs>
    <ellipse cx="175" cy="165" rx="105" ry="95" fill="#c8e6c9" opacity="0.3"/>
    <path d="M240 65 C262 152, 188 258, 112 224 C154 202, 188 148, 240 65Z" fill="url(#lbr2)" opacity="0.6"/>
    <path d="M237 68 C202 108, 168 160, 115 222" fill="none" stroke="#4caf50" strokeWidth="1.1" opacity="0.4"/>
    <path d="M222 42 C255 138, 175 256, 90 214 C140 188, 178 130, 222 42Z" fill="url(#lbr1)" opacity="0.82"/>
    <path d="M219 46 C188 90, 152 148, 93 212" fill="none" stroke="#2e7d32" strokeWidth="1.5" opacity="0.5"/>
    <path d="M188 100 C172 115, 164 133, 166 150" fill="none" stroke="#2e7d32" strokeWidth="0.9" opacity="0.4"/>
    <path d="M162 153 C146 168, 139 186, 141 202" fill="none" stroke="#2e7d32" strokeWidth="0.9" opacity="0.4"/>
    <path d="M240 108 C258 172, 202 248, 142 226 C174 206, 202 164, 240 108Z" fill="#a5d6a7" opacity="0.72"/>
    <path d="M237 112 C214 146, 186 180, 145 224" fill="none" stroke="#388e3c" strokeWidth="1" opacity="0.4"/>
    <path d="M240 65 C222 92, 202 124, 180 158" fill="none" stroke="#2e7d32" strokeWidth="2.2" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

const App = () => {
  const { data, loading, error, lastUpdated } = useSensorData();

  return (
    <div style={styles.page}>
      <LeafTopLeft />
      <LeafBottomRight />

      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Crop Monitoring Dashboard</h1>
        </div>

        {/* Error banner */}
        {error && (
          <div style={styles.errorBanner}>⚠️ {error}</div>
        )}

        {/* Sensor Cards */}
        {loading ? (
          <div style={styles.loadingRow}>Loading sensor data...</div>
        ) : (
          <div style={styles.cardsRow}>
            <SensorCard type="moisture"    value={data.soil}              unit="%"  label="Soil Moisture" />
            <SensorCard type="temperature" value={data.temperature}       unit="°C" label="Temperature" />
            <SensorCard type="humidity"    value={data.humidity}          unit="%"  label="Humidity" />
            <SensorCard type="light"       value={formatLight(data.light)} unit=""  label="Light Condition" />
          </div>
        )}

        {/* Soil Status Banner */}
        <SoilStatus status={data.status} />

        {/* AI Suggestion */}
        <AISuggestion
          soil={data.soil}
          temperature={data.temperature}
          humidity={data.humidity}
          light={data.light}
        />

      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#eef6ee",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    padding: "48px 24px",
    fontFamily: "Segoe UI, sans-serif",
  },
  container: {
    width: "100%",
    maxWidth: "860px",
    display: "flex",
    flexDirection: "column",
    gap: "22px",
    position: "relative",
    zIndex: 1,
  },
  header: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    marginBottom: "4px",
  },
  title: {
    margin: 0,
    fontSize: "38px",
    fontWeight: "800",
    color: "#1b5e20",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    margin: 0,
    fontSize: "15px",
    color: "#777",
    letterSpacing: "0.2px",
  },
  lastUpdated: {
    fontSize: "12px",
    color: "#555",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "20px",
    padding: "5px 16px",
    marginTop: "4px",
  },
  cardsRow: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },
  loadingRow: {
    textAlign: "center",
    color: "#888",
    fontSize: "15px",
    padding: "24px",
  },
  errorBanner: {
    backgroundColor: "#ffebee",
    color: "#c62828",
    borderRadius: "12px",
    padding: "14px 18px",
    fontSize: "14px",
    textAlign: "center",
  },
};

export default App;