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

    const snap = await getDocs(q);

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
      maxWidth: "760px",
      margin: "0 auto",
      padding: "15px",
      color: "#fff",
    }}
  >
      <button
        onClick={() => navigate(-1)}
        style={{
  background: "#d60000",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: "8px",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  marginBottom: "20px",
}}
      >
        ← Back
      </button>

      <img
  src={post.image}
  alt={post.title}
  style={{
    width: "100%",
    height: "260px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "20px",
  }}
/>

      <span
        style={{
  display: "inline-block",
  background: "#d60000",
  color: "#fff",
  padding: "6px 14px",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "600",
}}
      >
        {post.category}
      </span>

      <h1
  style={{
    fontSize: "34px",
    lineHeight: "1.3",
    fontWeight: "700",
    marginTop: "18px",
    marginBottom: "12px",
    color: "#fff",
  }}
>
  {post.title}
</h1>

      <div
  style={{
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    color: "#aaa",
    fontSize: "14px",
    marginBottom: "20px",
  }}
>
  <span>📅 {post.date || "July 2026"}</span>
  <span>✍️ FlashNews24</span>
  <span>⏱️ 3 min read</span>
</div>

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
  width: "100%",
  marginTop: "30px",
  background: "#d60000",
  color: "#fff",
  border: "none",
  padding: "14px",
  borderRadius: "8px",
  fontSize: "17px",
  fontWeight: "600",
  cursor: "pointer",
}}
      >
        📤 Share
      </button>
      <h2
  style={{
    marginTop: "40px",
    marginBottom: "20px",
    color: "#fff",
    fontSize: "24px",
    fontWeight: "700",
  }}
>
  📰 Related Articles
</h2>
    <div
  style={{
    background: "#1b1b1b",
    borderRadius: "10px",
    padding: "15px",
    color: "#bbb",
    textAlign: "center",
  }}
>
  Related articles will appear here.
</div>
    </div>
  );
      }
