import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const snapshot = await getDocs(collection(db, "posts"));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(data);
    }
    loadPosts();
  }, []);

  if (posts.length === 0) {
    return (
      <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  const hero = posts[0];
  const latest = posts.slice(1);

  return (
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
