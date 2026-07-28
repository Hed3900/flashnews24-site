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
      <div style={{ marginBottom: "25px" }}>
        <img
          src={hero.image}
          alt={hero.title}
          style={{
            width: "100%",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />

        <h2
          style={{
            color: "#fff",
            marginTop: "15px",
          }}
        >
          {hero.title}
        </h2>

        <p
          style={{
            color: "#ff3b3b",
            fontWeight: "bold",
          }}
        >
          {hero.category}
        </p>
      </div>

      <h3 style={{ color: "#fff" }}>Latest News</h3>

      {latest.map((post) => (
        <div
          key={post.id}
          style={{
            display: "flex",
            gap: "15px",
            background: "#1b1b1b",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "15px",
            alignItems: "center",
          }}
        >
          <img
            src={post.image}
            alt={post.title}
            style={{
              width: "110px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />

          <div
  key={post.id}
  onClick={() => navigate(`/article/${post.id}`)}
  style={{
    display: "flex",
    gap: "15px",
    background: "#1b1b1b",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "15px",
    alignItems: "center",
    cursor: "pointer",
  }}
>
            <h4
              style={{
                color: "#fff",
                margin: "0 0 6px",
              }}
            >
              {post.title}
            </h4>

            <small style={{ color: "#ff3b3b" }}>
              {post.category}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}
