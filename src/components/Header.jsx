import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <span className="red">FLASH</span>NEWS24
      </div>

      <div className="actions">
  <button aria-label="Search">🔍</button>
  <button aria-label="Menu">☰</button>
</div>
    </header>
  );
}
