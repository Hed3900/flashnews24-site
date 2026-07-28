import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Home() {
  const [posts, setPosts] = useState([]);

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

  return (
    <div style={{ padding: "20px" }}>
      <h1>FlashNews24</h1>

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #ddd",
            marginBottom: "20px",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              style={{ width: "100%", maxWidth: "500px" }}
            />
          )}

          <h2>{post.title}</h2>
          <p>{post.category}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
