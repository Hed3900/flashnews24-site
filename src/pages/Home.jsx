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
