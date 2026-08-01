import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { getPosts, getPost } from "../services/bloggerService";

export default function ImportBlogger() {
  const [loading, setLoading] = useState(false);

  async function importPosts() {
    setLoading(true);

    try {
      const posts = await getPosts();

      let imported = 0;

      for (const item of posts) {
  const fullPost = await getPost(item.id);

  console.log(fullPost.labels);

  let image = fullPost.images?.[0]?.url || "";

  if (!image) {
    const match = fullPost.content.match(/<img[^>]+src="([^"]+)"/i);
    image = match ? match[1] : "";
  }

  await addDoc(collection(db, "posts"), {
    bloggerPostId: fullPost.id,
    bloggerUrl: fullPost.url || "",
    title: fullPost.title,
    content: fullPost.content,
    image,
    category: fullPost.labels?.[0] || "General",
    keywords: fullPost.labels?.join(", ") || "",
          description: "",
          slug:
            fullPost.url?.split("/").pop() || "",
          status: "published",
          authorName: "News DESK",
          authorEmail: "",
          createdAt:
            fullPost.published ||
            new Date().toISOString(),
          publishedAt:
            fullPost.published ||
            new Date().toISOString(),
        });

        imported++;
      }

      alert(`${imported} Posts Imported Successfully`);
    } catch (e) {
      console.error(e);
      alert(e.message);
    }

    setLoading(false);
  }

  return (
    <div>
      <div
        style={{
          padding: 40,
          color: "#fff",
        }}
      >
        <h2>Import Blogger Posts</h2>

        <button
          onClick={importPosts}
          disabled={loading}
          style={{
            marginTop: 20,
            padding: "14px 25px",
            background: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          {loading
            ? "Importing..."
            : "Import All Blogger Posts"}
        </button>
      </div>
    </div>
  );
}
