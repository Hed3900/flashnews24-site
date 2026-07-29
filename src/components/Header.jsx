import "./Header.css";
const [menuOpen, setMenuOpen] = useState(false);
export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <span className="red">FLASH</span>NEWS24
      </div>

      <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }}
>
  <button
    onClick={() => navigate("/search")}
    style={{
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      border: "1px solid #333",
      background: "#1b1b1b",
      color: "#fff",
      fontSize: "20px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    🔍
  </button>

  <button
    onClick={() => setMenuOpen(!menuOpen)}
    style={{
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      border: "1px solid #333",
      background: "#d60000",
      color: "#fff",
      fontSize: "22px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    ☰
  </button>
</div>
      {menuOpen && (
  <div
    style={{
      position: "absolute",
      top: "70px",
      right: "12px",
      width: "220px",
      background: "#1b1b1b",
      border: "1px solid #333",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 8px 24px rgba(0,0,0,.45)",
      zIndex: 9999,
    }}
  >
    <div style={{ padding: "14px", color: "#fff" }}>🏠 Home</div>
    <div style={{ padding: "14px", color: "#fff" }}>🌍 World</div>
    <div style={{ padding: "14px", color: "#fff" }}>🇮🇳 India</div>
    <div style={{ padding: "14px", color: "#fff" }}>💼 Business</div>
    <div style={{ padding: "14px", color: "#fff" }}>⚽ Sports</div>
    <div style={{ padding: "14px", color: "#fff" }}>📞 Contact</div>
  </div>
)}
    </header>
  );
}
