import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Home({
  selectedCategory
}) {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

const filteredPosts =
  selectedCategory === "All"
    ? posts
    : posts.filter(
        post => post.category === selectedCategory
      );

if (filteredPosts.length === 0) {
  return (
    <h2
      style={{
        textAlign: "center",
        padding: "40px"
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
    padding: "12px"
  }}
>

      {/* Hero */}
      <div style={{ marginBottom: "25px" }}>
        <img
          src={hero.image}
          alt={hero.title}
          style={{
            width: "100%",
            borderRadius: "10px"
          }}
        />

        <h2>{hero.title}</h2>

        <p style={{ color: "#888" }}>
          {hero.category}
        </p>
      </div>

      <h3>Latest News</h3>

      {latest.map(post => (
        <div
          key={post.id}
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "18px",
            borderBottom: "1px solid #333",
            paddingBottom: "10px"
          }}
        >
          <img
            src={post.image}
            alt={post.title}
            width="120"
          />

          <div>
            <h4>{post.title}</h4>
            <small>{post.category}</small>
          </div>
        </div>
      ))}

    </div>
  );
}
