import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  limit,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";

export default function Article() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    async function loadPost() {
  try {
    const q = query(
      collection(db, "posts"),
      where("slug", "==", slug)
    );

    const snap = await getDocs(q);

    if (!snap.empty) {
      const currentPost = {
        id: snap.docs[0].id,
        ...snap.docs[0].data(),
      };

      setPost(currentPost);

      const relatedQuery = query(
        collection(db, "posts"),
        where("category", "==", currentPost.category),
        limit(4)
      );

      const relatedSnap = await getDocs(relatedQuery);

      setRelatedPosts(
        relatedSnap.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(p => p.slug !== currentPost.slug)
      );
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
    {relatedPosts.length === 0 ? (
  <div
    style={{
      background: "#1b1b1b",
      borderRadius: "10px",
      padding: "15px",
      textAlign: "center",
      color: "#bbb",
    }}
  >
    No related articles.
  </div>
) : (
  relatedPosts.map(item => (
    <div
      key={item.id}
      onClick={() => navigate(`/article/${item.slug}`)}
      style={{
  display: "flex",
  gap: "12px",
  alignItems: "center",
  background: "#1b1b1b",
  borderRadius: "12px",
  padding: "12px",
  marginBottom: "12px",
  cursor: "pointer",
  transition: "0.2s",
}}
      >
      <img
        src={item.image}
        alt={item.title}
        style={{
  width: "100px",
  height: "80px",
  objectFit: "cover",
  borderRadius: "8px",
  flexShrink: 0,
}}
      />

      <div>
        <h4
  style={{
    margin: "0 0 6px",
    color: "#fff",
    fontSize: "16px",
    lineHeight: "1.4",
  }}
>
  {item.title}
</h4>

        <span
  style={{
    background: "#d60000",
    color: "#fff",
    padding: "3px 8px",
    borderRadius: "12px",
    fontSize: "12px",
  }}
>
  {item.category}
</span>
      </div>
    </div>
  ))
)}
    </div>
  );
      }
