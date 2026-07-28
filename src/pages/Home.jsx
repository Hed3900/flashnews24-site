import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {
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
        <div key={post.id} style={{ marginBottom: "20px" }}>
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              width="300"
            />
          )}
          <h2>{post.title}</h2>
          <p>{post.category}</p>
        </div>
      ))}
    </div>
  );
}
