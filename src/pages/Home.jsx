import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Home({ selectedCategory }) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPosts() {
      const snapshot = await getDocs(collection(db, "posts"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(data);
    }

    loadPosts();
  }, []);

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter(
          (post) => post.category === selectedCategory
        );

  if (filteredPosts.length === 0) {
    return (
      <h2
        style={{
          textAlign: "center",
          padding: "40px",
          color: "#fff",
        }}
      >
        No articles found.
      </h2>
    );
  }

  const hero = filteredPosts[0];
  const latest = filteredPosts.slice(1);

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "12px",
      }}
    >
      {/* Hero */}
      <div
  onClick={() => navigate(`/article/${hero.slug}`)}
  style={{
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
    borderRadius: "14px",
    marginBottom: "30px",
  }}
>
  <img
    src={hero.image}
    alt={hero.title}
    style={{
      width: "100%",
      height: "320px",
borderRadius: "16px",
      objectFit: "cover",
    }}
  />

  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(to top, rgba(0,0,0,.85), rgba(0,0,0,.2))",
    }}
  />

  <div
    style={{
      position: "absolute",
      bottom: "20px",
      left: "20px",
      right: "20px",
    }}
  >
    <span
      style={{
        background: "#d60000",
        color: "#fff",
        padding: "6px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "700",
      }}
    >
      {hero.category}
    </span>

    <h2
      style={{
        color: "#fff",
        marginTop: "12px",
        fontSize: "34px",
fontWeight: "700",
textShadow: "0 2px 10px rgba(0,0,0,.7)",
        lineHeight: "1.3",
      }}
    >
      {hero.title}
    </h2>
  </div>
</div>
<h3
  style={{
    color: "#fff",
    fontSize: "24px",
    fontWeight: "700",
    margin: "30px 0 18px",
  }}
>
  🔥 Top Stories
</h3>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
    marginBottom: "30px",
  }}
>
  {latest.slice(0, 4).map((post) => (
    <div
      key={post.id}
      onClick={() => navigate(`/article/${post.slug}`)}
      style={{
        background: "#1b1b1b",
        borderRadius: "14px",
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid #2b2b2b",
        boxShadow: "0 4px 12px rgba(0,0,0,.35)",
      }}
    >
      <img
        src={post.image}
        alt={post.title}
        style={{
          width: "100%",
          height: "120px",
          objectFit: "cover",
        }}
      />

      <div style={{ padding: "10px" }}>
        <span
          style={{
            background: "#d60000",
            color: "#fff",
            padding: "3px 8px",
            borderRadius: "10px",
            fontSize: "11px",
            fontWeight: "600",
          }}
        >
          {post.category}
        </span>

        <h4
          style={{
            color: "#fff",
            marginTop: "10px",
            fontSize: "15px",
            lineHeight: "1.4",
          }}
        >
          {post.title}
        </h4>
      </div>
    </div>
  ))}
</div>
      <h3
  style={{
    color: "#fff",
    fontSize: "24px",
    fontWeight: "700",
    margin: "30px 0 18px",
  }}
>
  🔥 Trending Now
</h3>

<div
  style={{
    display: "flex",
    overflowX: "auto",
    gap: "14px",
    paddingBottom: "10px",
    scrollbarWidth: "none",
  }}
>
  {filteredPosts.slice(0, 10).map((post, index) => (
    <div
      key={post.id}
      onClick={() => navigate(`/article/${post.slug}`)}
      style={{
        minWidth: "240px",
        background: "#1b1b1b",
        borderRadius: "14px",
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid #2b2b2b",
        boxShadow: "0 4px 12px rgba(0,0,0,.35)",
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: "100%",
            height: "140px",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            background: "#d60000",
            color: "#fff",
            padding: "4px 10px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "700",
          }}
        >
          #{index + 1}
        </div>
      </div>

      <div style={{ padding: "12px" }}>
        <div
          style={{
            color: "#ff3b3b",
            fontSize: "12px",
            fontWeight: "600",
            marginBottom: "8px",
          }}
        >
          {post.category}
        </div>

        <h4
          style={{
            color: "#fff",
            margin: 0,
            fontSize: "16px",
            lineHeight: "1.4",
          }}
        >
          {post.title}
        </h4>
      </div>
    </div>
  ))}
</div>
      <h3
  style={{
    color: "#fff",
    fontSize: "24px",
    fontWeight: "700",
    margin: "25px 0 18px",
  }}
>
  📰 Latest News
</h3>

      {latest.slice(4).map((post) => (
        <div
          key={post.id}
          onClick={() => navigate(`/article/${post.slug}`)}
          style={{
  display: "flex",
  gap: "15px",
  background: "#1b1b1b",
  padding: "12px",
  borderRadius: "14px",
  marginBottom: "15px",
  alignItems: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,.35)",
  border: "1px solid #2b2b2b",
  cursor: "pointer",
  transition: "0.25s",
}}
        >
          <img
            src={post.image}
            alt={post.title}
            style={{
              width: "120px",
              height: "90px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />

           <div
  style={{
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }}
>
  <h4
    style={{
      color: "#fff",
      margin: "0 0 8px",
      fontSize: "17px",
      fontWeight: "700",
      lineHeight: "1.4",
    }}
  >
    {post.title}
  </h4>

  <span
    style={{
      display: "inline-block",
      width: "fit-content",
      background: "#d60000",
      color: "#fff",
      padding: "4px 10px",
      borderRadius: "12px",
      fontSize: "11px",
      fontWeight: "600",
      marginBottom: "8px",
    }}
  >
    {post.category}
  </span>

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#888",
      fontSize: "12px",
    }}
  >
    <span>📅 {post.date || "Today"}</span>

    <span
      style={{
        color: "#d60000",
        fontSize: "18px",
        fontWeight: "700",
      }}
    >
      →
    </span>
  </div>
</div>
          </div>
      ))}
    </div>
  );
}
