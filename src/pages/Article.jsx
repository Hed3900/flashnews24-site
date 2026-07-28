import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";

export default function Article() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      try {
        const ref = doc(db, "posts", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setPost({
            id: snap.id,
            ...snap.data(),
          });
        }
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }

    loadPost();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          color: "#fff",
          textAlign: "center",
          padding: "40px",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!post) {
    return (
      <div
        style={{
          color: "#fff",
          textAlign: "center",
          padding: "40px",
        }}
      >
        Article not found.
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "15px",
        color: "#fff",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          background: "#d60000",
          color: "#fff",
          border: "none",
          padding: "10px 16px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      <img
        src={post.image}
        alt={post.title}
        style={{
          width: "100%",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      />

      <span
        style={{
          display: "inline-block",
          background: "#d60000",
          padding: "5px 12px",
          borderRadius: "20px",
          marginBottom: "15px",
        }}
      >
        {post.category}
      </span>

      <h1>{post.title}</h1>

      <p style={{ color: "#999" }}>
        {post.date || "FlashNews24"}
      </p>

      <div
        style={{
          lineHeight: "1.8",
          fontSize: "18px",
          marginTop: "20px",
        }}
      >
        {post.content}
      </div>

      <button
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: post.title,
              text: post.title,
              url: window.location.href,
            });
          }
        }}
        style={{
          marginTop: "30px",
          background: "#d60000",
          color: "#fff",
          border: "none",
          padding: "12px 18px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        📤 Share
      </button>
    </div>
  );
      }
