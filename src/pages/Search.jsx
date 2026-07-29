import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
      <h2 style={{ color: "#fff" }}>🔍 Search News</h2>

      <input
        type="text"
        placeholder="Search news..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "10px",
          border: "1px solid #444",
          background: "#1b1b1b",
          color: "#fff",
          fontSize: "16px",
          outline: "none",
        }}
      />
    </div>
  );
}
