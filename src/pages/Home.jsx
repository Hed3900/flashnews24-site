import { useEffect, useState, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Home({ selectedCategory }) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
const [heroIndex, setHeroIndex] = useState(0);
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
useEffect(() => {
  if (heroPosts.length <= 1) return;

  const timer = setInterval(() => {
    setHeroIndex((prev) =>
      prev === heroPosts.length - 1 ? 0 : prev + 1
    );
  }, 5000);

  return () => clearInterval(timer);
}, [heroPosts]);
  const filteredPosts =
  selectedCategory === "All"
    ? posts
    : posts.filter(
        (post) => post.category === selectedCategory
      );

const sortedPosts = [...filteredPosts].reverse();

const heroPosts = useMemo(
  () => sortedPosts.slice(0, 5),
  [sortedPosts]
);

const hero = heroPosts[heroIndex] || null;
const latest = sortedPosts.slice(5);

useEffect(() => {
  if (heroPosts.length <= 1) return;

  const timer = setInterval(() => {
    setHeroIndex((prev) =>
      prev === heroPosts.length - 1 ? 0 : prev + 1
    );
  }, 5000);

  return () => clearInterval(timer);
}, [heroPosts]);

if (!hero) {
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
    marginBottom: "30px",
    cursor: "pointer",
    borderRadius: "14px",
    overflow: "hidden",
  }}
>
  <img
    src={hero.image}
    alt={hero.title}
    style={{
      width: "100%",
      height: "240px",
      objectFit: "cover",
    }}
  />

  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(to top, rgba(0,0,0,.85), rgba(0,0,0,.15))",
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
        fontSize: "28px",
        lineHeight: "1.3",
      }}
    >
      {hero.title}
    </h2>
  </div>

  <div
    style={{
      position: "absolute",
      bottom: "10px",
      right: "20px",
      display: "flex",
      gap: "6px",
    }}
  >
    {heroPosts.map((_, index) => (
      <div
        key={index}
        onClick={(e) => {
          e.stopPropagation();
          setHeroIndex(index);
        }}
        style={{
          width: heroIndex === index ? "20px" : "8px",
          height: "8px",
          borderRadius: "20px",
          background:
            heroIndex === index ? "#d60000" : "#ffffff99",
          transition: "0.3s",
        }}
      />
    ))}
  </div>
</div>

      <h3 style={{ color: "#fff" }}>Latest News</h3>

      {latest.map((post) => (
        <div
          key={post.id}
          onClick={() => navigate(`/article/${post.slug}`)}
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
      ))}
    </div>
  );
}
