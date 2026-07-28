import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <span className="red">FLASH</span>NEWS24
      </div>

      <div className="actions">
        <button>🔍</button>
        <button>☰</button>
      </div>
    </header>
  );
}
