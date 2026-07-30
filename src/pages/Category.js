import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";

export default function Category() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const snap = await getDocs(collection(db, "posts"));

        const allPosts = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filtered =
          category.toLowerCase() === "all"
            ? allPosts
            : allPosts.filter(
                (post) =>
                  post.category?.toLowerCase() ===
                  category.toLowerCase()
              );

        setPosts(filtered);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }

    loadPosts();
  }, [category]);

  if (loading) {
    return (
      <div style={{ color: "#fff", padding: "40px", textAlign: "center" }}>
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
        color: "#fff",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "#d60000",
          color: "#fff",
          border: "none",
          padding: "10px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Back
      </button>

      <h1 style={{ marginBottom: "25px", textTransform: "capitalize" }}>
        {category} News
      </h1>

      {posts.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            onClick={() => navigate(`/article/${post.slug}`)}
            style={{
              display: "flex",
              gap: "15px",
              background: "#1b1b1b",
              borderRadius: "12px",
              marginBottom: "15px",
              padding: "12px",
              cursor: "pointer",
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

            <div>
              <span
                style={{
                  background: "#d60000",
                  color: "#fff",
                  padding: "3px 8px",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
              >
                {post.category}
              </span>

              <h3 style={{ marginTop: "10px", color: "#fff" }}>
                {post.title}
              </h3>

              <small style={{ color: "#aaa" }}>
                {post.date || "Today"}
              </small>
            </div>
          </div>
        ))
      )}
    </div>
  );
          }
