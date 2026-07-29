import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";

export default function Article() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
  try {

    const q = query(
      collection(db, "posts"),
      where("slug", "==", slug)
    );
const snapshot = await getDocs(collection(db, "posts"));

console.log(
  snapshot.docs.map(d => ({
    id: d.id,
    ...d.data()
  }))
);
    const snap = await getDocs(q);

    console.log("Slug =", slug);
    console.log("Size =", snap.size);

    if (!snap.empty) {
      setPost({
        id: snap.docs[0].id,
        ...snap.docs[0].data(),
      });
    }
  } catch (err) {
    console.error(err);
  }

  setLoading(false);
    }
    loadPost();
  }, [slug]);

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
    <div style={{ color: "#fff", textAlign: "center", padding: "40px" }}>
      <h2 style={{ color: "yellow" }}>{slug}</h2>
      <p>Article not found.</p>
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
  className="article-content"
  style={{
    textAlign: "left",
    fontSize: "18px",
    lineHeight: "1.9",
    color: "#ddd",
  }}
  dangerouslySetInnerHTML={{
    __html: (post.content || "").replace(/&nbsp;/g, " "),
  }}
/>
      <style>{`
.article-content p{
  margin:16px 0;
}

.article-content h1,
.article-content h2,
.article-content h3,
.article-content h4{
  margin:24px 0 12px;
  color:#fff;
}

.article-content ul,
.article-content ol{
  padding-left:24px;
}

.article-content li{
  margin:8px 0;
}

.article-content img{
  max-width:100%;
  height:auto;
  border-radius:10px;
}
`}</style>
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
