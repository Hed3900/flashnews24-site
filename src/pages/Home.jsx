import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Home({ selectedCategory }) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

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

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter(
          (post) => post.category === selectedCategory
        );

  if (filteredPosts.length === 0) {
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

  const hero = filteredPosts[0];
  const latest = filteredPosts.slice(1);

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
    cursor: "pointer",
    overflow: "hidden",
    borderRadius: "14px",
    marginBottom: "30px",
  }}
>
  <img
    src={hero.image}
    alt={hero.title}
    style={{
      width: "100%",
      height: "320px",
borderRadius: "16px",
      objectFit: "cover",
    }}
  />

  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(to top, rgba(0,0,0,.85), rgba(0,0,0,.2))",
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
        fontSize: "34px",
fontWeight: "700",
textShadow: "0 2px 10px rgba(0,0,0,.7)",
        lineHeight: "1.3",
      }}
    >
      {hero.title}
    </h2>
  </div>
</div>
<h3
  style={{
    color: "#fff",
    fontSize: "24px",
    fontWeight: "700",
    margin: "30px 0 18px",
  }}
>
  🔥 Top Stories
</h3>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
    marginBottom: "30px",
  }}
>
  {latest.slice(0, 4).map((post) => (
    <div
      key={post.id}
      onClick={() => navigate(`/article/${post.slug}`)}
      style={{
        background: "#1b1b1b",
        borderRadius: "14px",
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid #2b2b2b",
        boxShadow: "0 4px 12px rgba(0,0,0,.35)",
      }}
    >
      <img
  src={post.image}
  alt={post.title}
  loading="lazy"
        style={{
          width: "100%",
          height: "120px",
          objectFit: "cover",
        }}
      />

      <div style={{ padding: "10px" }}>
        <span
          style={{
            background: "#d60000",
            color: "#fff",
            padding: "3px 8px",
            borderRadius: "10px",
            fontSize: "11px",
            fontWeight: "600",
          }}
        >
          {post.category}
        </span>

        <h4
          style={{
            color: "#fff",
            marginTop: "10px",
            fontSize: "15px",
            lineHeight: "1.4",
          }}
        >
          {post.title}
        </h4>
      </div>
    </div>
  ))}
</div>
      <h3
  style={{
    color: "#fff",
    fontSize: window.innerWidth <= 768 ? "20px" : "24px",
    fontWeight: "700",
    margin: "30px 0 18px",
    textAlign: "center",
  }}
>
  🔥 Trending Now
</h3>

<div
  style={{
    display: "flex",
    flexDirection: window.innerWidth <= 768 ? "column" : "row",
    overflowX: window.innerWidth <= 768 ? "hidden" : "auto",
    gap: "14px",
    paddingBottom: "10px",
    scrollbarWidth: "none",
  }}
>
  {filteredPosts.slice(0, 10).map((post, index) => (
    <div
      key={post.id}
      onClick={() => navigate(`/article/${post.slug}`)}
      style={{
        minWidth: window.innerWidth <= 768 ? "100%" : "240px",
        width: window.innerWidth <= 768 ? "100%" : "240px",
        background: "#1b1b1b",
        borderRadius: "14px",
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid #2b2b2b",
        boxShadow: "0 4px 12px rgba(0,0,0,.35)",
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: "100%",
            height: window.innerWidth <= 768 ? "200px" : "140px",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            background: "#d60000",
            color: "#fff",
            padding: "4px 10px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "700",
          }}
        >
          #{index + 1}
        </div>
      </div>

      <div style={{ padding: "14px" }}>
        <div
          style={{
            color: "#ff3b3b",
            fontSize: "12px",
            fontWeight: "600",
            marginBottom: "8px",
          }}
        >
          {post.category}
        </div>

        <h4
          style={{
            color: "#fff",
            margin: 0,
            fontSize: window.innerWidth <= 768 ? "18px" : "16px",
            lineHeight: "1.5",
          }}
        >
          {post.title}
        </h4>
      </div>
    </div>
  ))}
</div>
      <h3
  style={{
    color: "#fff",
    fontSize: "24px",
    fontWeight: "700",
    margin: "25px 0 18px",
  }}
>
  📰 Latest News
</h3>

{latest.map((post) => (
  <div
    key={post.id}
    onClick={() => navigate(`/article/${post.slug}`)}
    style={{
      display: "flex",
      gap: "15px",
      background: "#1b1b1b",
      padding: "12px",
      borderRadius: "14px",
      marginBottom: "15px",
      alignItems: "center",
      boxShadow: "0 4px 12px rgba(0,0,0,.35)",
      border: "1px solid #2b2b2b",
      cursor: "pointer",
      transition: "0.25s",
    }}
  >
    <img
      src={post.image}
      alt={post.title}
      style={{
        width: "120px",
        height: "90px",
        objectFit: "cover",
        borderRadius: "8px",
      }}
    />

    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h4
        style={{
          color: "#fff",
          margin: "0 0 8px",
          fontSize: "17px",
          fontWeight: "700",
          lineHeight: "1.4",
        }}
      >
        {post.title}
      </h4>

      <span
        style={{
          display: "inline-block",
          width: "fit-content",
          background: "#d60000",
          color: "#fff",
          padding: "4px 10px",
          borderRadius: "12px",
          fontSize: "11px",
          fontWeight: "600",
          marginBottom: "8px",
        }}
      >
        {post.category}
      </span>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#888",
          fontSize: "12px",
        }}
      >
        <span>📅 {post.date || "Today"}</span>

        <span
          style={{
            color: "#d60000",
            fontSize: "18px",
            fontWeight: "700",
          }}
        >
          →
        </span>
  </div>  
</div>  
    
          </div>  
      ))} 
      <h3
  style={{
    color: "#fff",
    fontSize: "24px",
    fontWeight: "700",
    margin: "35px 0 18px",
  }}
>
  ⚡ Live Updates
</h3>

<div
  style={{
    background: "#1b1b1b",
    border: "1px solid #2b2b2b",
    borderRadius: "14px",
    overflow: "hidden",
    marginBottom: "35px",
  }}
>
  {filteredPosts.slice(0, 5).map((post, index) => (
    <div
      key={post.id}
      onClick={() => navigate(`/article/${post.slug}`)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
        padding: "16px",
        borderBottom:
          index !== filteredPosts.slice(0, 5).length - 1
            ? "1px solid #2b2b2b"
            : "none",
        cursor: "pointer",
      }}
    >
      <span
        style={{
          background: "#d60000",
          color: "#fff",
          fontSize: "11px",
          fontWeight: "700",
          padding: "5px 10px",
          borderRadius: "20px",
          whiteSpace: "nowrap",
        }}
      >
        🔴 LIVE
      </span>

      <div style={{ flex: 1 }}>
        <div
          style={{
            color: "#fff",
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: "5px",
          }}
        >
          {post.title}
        </div>

        <small style={{ color: "#999" }}>
          {post.category} • {post.date || "Just now"}
        </small>
      </div>
    </div>
  ))}
</div>
      <h3
  style={{
    color: "#fff",
    fontSize: "24px",
    fontWeight: "700",
    margin: "35px 0 18px",
  }}
>
  📈 Most Read
</h3>

<div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "30px",
  }}
>
  {filteredPosts.slice(0, 5).map((post, index) => (
    <div
      key={post.id}
      onClick={() => navigate(`/article/${post.slug}`)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
        background: "#1b1b1b",
        padding: "14px",
        borderRadius: "14px",
        cursor: "pointer",
        border: "1px solid #2b2b2b",
        boxShadow: "0 4px 12px rgba(0,0,0,.35)",
      }}
    >
      <div
        style={{
          minWidth: "42px",
          height: "42px",
          borderRadius: "50%",
          background: "#d60000",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: "700",
        }}
      >
        {index + 1}
      </div>

      <img
        src={post.image}
        alt={post.title}
        style={{
          width: "80px",
          height: "60px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      <div style={{ flex: 1 }}>
        <h4
          style={{
            color: "#fff",
            margin: "0 0 6px",
            fontSize: "16px",
            lineHeight: "1.4",
          }}
        >
          {post.title}
        </h4>

        <small
          style={{
            color: "#ff3b3b",
            fontWeight: "600",
          }}
        >
          {post.category}
        </small>
      </div>
    </div>
  ))}
</div>
      <h3
  style={{
    color: "#fff",
    fontSize: "24px",
    fontWeight: "700",
    margin: "35px 0 18px",
  }}
>
  🌍 News by Category
</h3>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
    marginBottom: "30px",
  }}
>
  {[
    "World",
    "India",
    "Politics",
    "Business",
    "Technology",
    "Sports",
    "Entertainment",
    "Health",
  ].map((category) => (
    <div
      key={category}
      onClick={() => navigate("/")}
      style={{
        background: "#1b1b1b",
        border: "1px solid #2b2b2b",
        borderRadius: "14px",
        padding: "18px",
        textAlign: "center",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,.35)",
      }}
    >
      <div
        style={{
          color: "#d60000",
          fontSize: "22px",
          fontWeight: "700",
          marginBottom: "8px",
        }}
      >
        {category}
      </div>

      <small style={{ color: "#aaa" }}>
        {
          filteredPosts.filter(
            (post) => post.category === category
          ).length
        }{" "}
        Articles
      </small>
    </div>
  ))}
</div>
      <h3
  style={{
    color: "#fff",
    fontSize: "24px",
    fontWeight: "700",
    margin: "35px 0 18px",
  }}
>
  📸 Photo Gallery
</h3>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "14px",
    marginBottom: "35px",
  }}
>
  {filteredPosts.slice(0, 6).map((post) => (
    <div
      key={post.id}
      onClick={() => navigate(`/article/${post.slug}`)}
      style={{
        position: "relative",
        cursor: "pointer",
        borderRadius: "14px",
        overflow: "hidden",
        height: "180px",
        boxShadow: "0 6px 16px rgba(0,0,0,.4)",
      }}
    >
      <img
        src={post.image}
        alt={post.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,.85), rgba(0,0,0,.15))",
          display: "flex",
          alignItems: "flex-end",
          padding: "12px",
        }}
      >
        <h4
          style={{
            color: "#fff",
            margin: 0,
            fontSize: "15px",
            lineHeight: "1.4",
          }}
        >
          {post.title}
        </h4>
      </div>
    </div>
  ))}
</div>
      <h3
  style={{
    color: "#fff",
    fontSize: "24px",
    fontWeight: "700",
    margin: "35px 0 18px",
  }}
>
  📱 Follow FlashNews24
</h3>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "15px",
    marginBottom: "35px",
  }}
>
  {[
    {
      name: "Telegram",
      icon: "📢",
      color: "#229ED9",
      url: "https://t.me/flashnews24news",
    },
    {
      name: "Facebook",
      icon: "📘",
      color: "#1877F2",
      url: "https://facebook.com/flashnews24offical",
    },
    {
      name: "Instagram",
      icon: "📷",
      color: "#E1306C",
      url: "https://instagram.com/",
    },
    {
      name: "YouTube",
      icon: "▶️",
      color: "#FF0000",
      url: "https://youtube.com/",
    },
  ].map((item) => (
    <div
      key={item.name}
      onClick={() => window.open(item.url, "_blank")}
      style={{
        background: "#1b1b1b",
        border: `2px solid ${item.color}`,
        borderRadius: "14px",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
        transition: "0.3s",
      }}
    >
      <div
        style={{
          fontSize: "42px",
          marginBottom: "10px",
        }}
      >
        {item.icon}
      </div>

      <h4
        style={{
          color: "#fff",
          margin: "0",
          fontSize: "18px",
        }}
      >
        {item.name}
      </h4>

      <small
        style={{
          color: "#aaa",
        }}
      >
        Follow Us
      </small>
    </div>
  ))}
</div>
      
      <h3
  style={{
    color: "#fff",
    fontSize: window.innerWidth <= 768 ? "20px" : "24px",
    fontWeight: "700",
    margin: "35px 0 18px",
    textAlign: "center",
  }}
>
  ⭐ Editor's Picks
</h3>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "16px",
  }}
>
  {filteredPosts.slice(0, 3).map((post) => (
    <div
      key={post.id}
      onClick={() => navigate(`/article/${post.slug}`)}
      style={{
        display: "flex",
        flexDirection: window.innerWidth <= 768 ? "column" : "row",
        gap: "14px",
        background: "#1b1b1b",
        borderRadius: "14px",
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid #2b2b2b",
        boxShadow: "0 4px 12px rgba(0,0,0,.35)",
      }}
    >
      <img
        src={post.image}
        alt={post.title}
        style={{
          width: window.innerWidth <= 768 ? "100%" : "140px",
          height: window.innerWidth <= 768 ? "220px" : "110px",
          objectFit: "cover",
        }}
      />

      <div
        style={{
          padding: "12px",
          flex: 1,
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: "#d60000",
            color: "#fff",
            padding: "4px 10px",
            borderRadius: "20px",
            fontSize: "11px",
            fontWeight: "700",
            marginBottom: "10px",
          }}
        >
          EDITOR'S PICK
        </span>

        <h4
          style={{
            color: "#fff",
            margin: "0 0 10px",
            fontSize: window.innerWidth <= 768 ? "18px" : "17px",
            lineHeight: "1.5",
          }}
        >
          {post.title}
        </h4>

        <small
          style={{
            color: "#999",
            fontSize: "13px",
          }}
        >
          📅 {post.date || "Today"}
        </small>
      </div>
    </div>
  ))}
</div>
      <h3
  style={{
    color: "#fff",
    fontSize: "24px",
    fontWeight: "700",
    margin: "35px 0 18px",
  }}
>
  🎥 Latest Videos
</h3>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "18px",
    marginBottom: "35px",
  }}
>
  {filteredPosts.slice(0, 3).map((post) => (
    <div
      key={post.id}
      onClick={() => navigate(`/article/${post.slug}`)}
      style={{
        background: "#1b1b1b",
        borderRadius: "14px",
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid #2b2b2b",
        boxShadow: "0 4px 12px rgba(0,0,0,.35)",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "190px",
        }}
      >
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            background: "rgba(214,0,0,.9)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
          }}
        >
          ▶
        </div>
      </div>

      <div style={{ padding: "16px" }}>
        <span
          style={{
            color: "#ff3b3b",
            fontSize: "12px",
            fontWeight: "700",
          }}
        >
          VIDEO NEWS
        </span>

        <h4
          style={{
            color: "#fff",
            marginTop: "10px",
            lineHeight: "1.5",
            fontSize: "17px",
          }}
        >
          {post.title}
        </h4>

        <small style={{ color: "#999" }}>
          ▶ Watch Full Coverage
        </small>
      </div>
    </div>
  ))}
</div>
      <h3
  style={{
    color: "#fff",
    fontSize: "24px",
    fontWeight: "700",
    margin: "35px 0 18px",
  }}
>
  📅 Today's Highlights
</h3>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "16px",
    marginBottom: "35px",
  }}
>
  {filteredPosts.slice(0, 4).map((post, index) => (
    <div
      key={post.id}
      onClick={() => navigate(`/article/${post.slug}`)}
      style={{
        background: "#1b1b1b",
        borderRadius: "14px",
        border: "1px solid #2b2b2b",
        padding: "18px",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,.35)",
      }}
    >
      <div
        style={{
          display: "inline-block",
          background: "#d60000",
          color: "#fff",
          padding: "5px 10px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: "700",
          marginBottom: "12px",
        }}
      >
        Highlight #{index + 1}
      </div>

      <h4
        style={{
          color: "#fff",
          fontSize: "18px",
          lineHeight: "1.5",
          margin: "0 0 10px",
        }}
      >
        {post.title}
      </h4>

      <div
        style={{
          color: "#999",
          fontSize: "13px",
        }}
      >
        🏷️ {post.category} &nbsp; • &nbsp; 📅 {post.date || "Today"}
      </div>
    </div>
  ))}
</div>
      <h3
  style={{
    color: "#fff",
    fontSize: "24px",
    fontWeight: "700",
    margin: "35px 0 18px",
  }}
>
  🏷️ Trending Topics
</h3>

<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "35px",
  }}
>
  {[
    "Breaking News",
    "India",
    "World",
    "Politics",
    "Business",
    "Technology",
    "Sports",
    "Entertainment",
    "Health",
    "Weather",
    "Crime",
    "Education",
  ].map((tag) => (
    <button
      key={tag}
      onClick={() => navigate(`/category/${tag.toLowerCase().replace(/\s+/g, "-")}`)}
      style={{
        background: "#1b1b1b",
        color: "#fff",
        border: "1px solid #d60000",
        borderRadius: "25px",
        padding: "10px 18px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "600",
        transition: "0.3s",
      }}
      onMouseEnter={(e) => {
        e.target.style.background = "#d60000";
      }}
      onMouseLeave={(e) => {
        e.target.style.background = "#1b1b1b";
      }}
    >
      #{tag}
    </button>
  ))}
</div>
      
      <h3
  style={{
    color: "#fff",
    fontSize: "24px",
    fontWeight: "700",
    margin: "35px 0 18px",
  }}
>
  🗳️ Poll of the Day
</h3>

<div
  style={{
    background: "#1b1b1b",
    border: "1px solid #2b2b2b",
    borderRadius: "14px",
    padding: "24px",
    marginBottom: "35px",
    boxShadow: "0 4px 12px rgba(0,0,0,.35)",
  }}
>
  <h4
    style={{
      color: "#fff",
      marginBottom: "20px",
      lineHeight: "1.5",
    }}
  >
    Which news category do you read the most?
  </h4>

  {[
    "🌍 World",
    "🇮🇳 India",
    "💼 Business",
    "⚽ Sports",
    "💻 Technology",
    "🎬 Entertainment",
  ].map((option) => (
    <button
      key={option}
      style={{
        width: "100%",
        background: "#222",
        color: "#fff",
        border: "1px solid #333",
        borderRadius: "10px",
        padding: "14px",
        marginBottom: "12px",
        textAlign: "left",
        cursor: "pointer",
        fontSize: "15px",
      }}
    >
      {option}
    </button>
  ))}

  <div
    style={{
      marginTop: "15px",
      color: "#999",
      fontSize: "13px",
      textAlign: "center",
    }}
  >
    Vote feature can be connected to Firebase later.
  </div>
</div>
<h3
  style={{
    color: "#fff",
    fontSize: "24px",
    fontWeight: "700",
    margin: "35px 0 18px",
  }}
>
  💰 Gold & Silver Prices
</h3>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))",
    gap: "18px",
    marginBottom: "35px",
  }}
>
  <div
    style={{
      background: "#1b1b1b",
      border: "1px solid #FFD700",
      borderRadius: "14px",
      padding: "20px",
      boxShadow: "0 4px 12px rgba(0,0,0,.35)",
    }}
  >
    <div
      style={{
        fontSize: "40px",
        textAlign: "center",
        marginBottom: "10px",
      }}
    >
      🥇
    </div>

    <h4
      style={{
        color: "#FFD700",
        textAlign: "center",
        marginBottom: "15px",
      }}
    >
      Gold Price
    </h4>

    <div
      style={{
        color: "#fff",
        textAlign: "center",
        fontSize: "26px",
        fontWeight: "700",
      }}
    >
      ₹98,450
    </div>

    <p
      style={{
        color: "#999",
        textAlign: "center",
        marginTop: "8px",
      }}
    >
      Per 10 Grams (24K)
    </p>

    <div
      style={{
        color: "#4CAF50",
        textAlign: "center",
        fontWeight: "600",
      }}
    >
      ▲ +₹350 Today
    </div>
  </div>

  <div
    style={{
      background: "#1b1b1b",
      border: "1px solid #C0C0C0",
      borderRadius: "14px",
      padding: "20px",
      boxShadow: "0 4px 12px rgba(0,0,0,.35)",
    }}
  >
    <div
      style={{
        fontSize: "40px",
        textAlign: "center",
        marginBottom: "10px",
      }}
    >
      🪙
    </div>

    <h4
      style={{
        color: "#C0C0C0",
        textAlign: "center",
        marginBottom: "15px",
      }}
    >
      Silver Price
    </h4>

    <div
      style={{
        color: "#fff",
        textAlign: "center",
        fontSize: "26px",
        fontWeight: "700",
      }}
    >
      ₹1,12,500
    </div>

    <p
      style={{
        color: "#999",
        textAlign: "center",
        marginTop: "8px",
      }}
    >
      Per Kilogram
    </p>

    <div
      style={{
        color: "#F44336",
        textAlign: "center",
        fontWeight: "600",
      }}
    >
      ▼ -₹500 Today
    </div>
  </div>
</div>
<footer
  style={{
    background: "#111",
    color: "#fff",
    marginTop: "50px",
    padding: "40px 20px 20px",
    borderTop: "3px solid #d60000",
  }}
>
  <div
    style={{
      maxWidth: "1200px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns:
  window.innerWidth <= 768
    ? "1fr"
    : "repeat(auto-fit,minmax(220px,1fr))",
      gap: "30px",
    }}
  >
    {/* Logo */}
    <div>
      <h2
        style={{
          color: "#d60000",
          marginBottom: "10px",
        }}
      >
        FlashNews24
      </h2>

      <p
        style={{
          color: "#bbb",
          lineHeight: "1.7",
          fontSize: "15px",
        }}
      >
        FlashNews24 brings breaking news, world updates, politics,
        business, sports, technology and entertainment coverage
        24 hours a day.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 style={{ marginBottom: "15px" }}>Quick Links</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <a href="/" style={{ color: "#bbb", textDecoration: "none" }}>Home</a>
        <a href="/about" style={{ color: "#bbb", textDecoration: "none" }}>About Us</a>
        <a href="/contact" style={{ color: "#bbb", textDecoration: "none" }}>Contact</a>
        <a href="/privacy" style={{ color: "#bbb", textDecoration: "none" }}>Privacy Policy</a>
        <a href="/terms" style={{ color: "#bbb", textDecoration: "none" }}>Terms & Conditions</a>
      </div>
    </div>

    {/* Categories */}
    <div>
      <h3 style={{ marginBottom: "15px" }}>Categories</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <span>🌍 World</span>
        <span>🇮🇳 India</span>
        <span>🏛 Politics</span>
        <span>💼 Business</span>
        <span>💻 Technology</span>
        <span>⚽ Sports</span>
      </div>
    </div>

    {/* Contact */}
    <div>
      <h3 style={{ marginBottom: "15px" }}>Contact</h3>

      <p style={{ color: "#bbb" }}>📧 flashnews24official@gmail.com</p>
      <p style={{ color: "#bbb" }}>🌐 www.flashnews24.site</p>
<div
      style={{
  display: "flex",
  justifyContent:
    window.innerWidth <= 768 ? "center" : "flex-start",
  gap: "12px",
  marginTop: "20px",
  fontSize: "24px",
  flexWrap: "wrap",
}}
     >
<span>📘</span>
        <span>📢</span>
        <span>📷</span>
        <span>▶️</span>
        <span>❌</span>
      </div>
    </div>
  </div>

  <hr
    style={{
      border: "none",
      borderTop: "1px solid #333",
      margin: "30px 0 20px",
    }}
  />

  <div
    style={{
      textAlign: "center",
      color: "#888",
      fontSize: "14px",
    }}
  >
    © {new Date().getFullYear()} FlashNews24. All Rights Reserved.
  </div>
</footer>

    </div>  
  );  
}  
