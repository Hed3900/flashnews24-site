import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search({ posts = [] }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filtered = posts.filter((post) =>
    post.title?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
      <h2 style={{ color: "#fff", textAlign: "center" }}>
        🔍 Search News
      </h2>

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
          marginBottom: "20px",
        }}
      />

      {query !== "" &&
        filtered.map((post) => (
          <div
            key={post.id}
            onClick={() => navigate(`/article/${post.slug}`)}
            style={{
              display: "flex",
              gap: "12px",
              marginBottom: "16px",
              background: "#1b1b1b",
              borderRadius: "10px",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <img
              src={post.image}
              alt={post.title}
              style={{
                width: "100px",
                height: "70px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />

            <div>
              <h4 style={{ color: "#fff", margin: 0 }}>
                {post.title}
              </h4>
              <small style={{ color: "#999" }}>
                {post.category}
              </small>
            </div>
          </div>
        ))}

      {query !== "" && filtered.length === 0 && (
        <p style={{ color: "#999", textAlign: "center" }}>
          No articles found.
        </p>
      )}
    </div>
  );
}
