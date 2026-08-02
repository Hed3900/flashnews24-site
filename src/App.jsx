import { HashRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { getToken } from "firebase/messaging";
import Search from "./pages/Search";
import Header from "./components/Header";
import BreakingTicker from "./components/BreakingTicker";
import CategoryBar from "./components/CategoryBar";
import BackToTop from "./components/BackToTop";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Category from "./pages/Category";
import { addDoc, collection } from "firebase/firestore";
import { db, messaging } from "./firebase";

function HomeLayout() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <>
      <Header />
      <BreakingTicker />

      <CategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <Home selectedCategory={selectedCategory} />
    </>
  );
}
export default function App() {
  useEffect(() => {
  async function enableNotifications() {
  if (!("Notification" in window)) return;

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register(
      "/flashnews24-site/firebase-messaging-sw.js"
    );

    const token = await getToken(messaging, {
      vapidKey: "BNOWKXK21uLfihl_fg5BfRWkRH99kHGkZa5L-n7Oyhwj8b4FGrNRSBiV-ttSQQ3KMTbTIdLT2WU7gfvJ5O74jH0",
      serviceWorkerRegistration: registration,
    });
await addDoc(collection(db, "fcmTokens"), {
  token,
  platform: "web",
  createdAt: new Date().toISOString(),
});

console.log("Notifications enabled successfully");
  } catch (err) {
    console.error("FCM Error:", err);
    console.error(err);
  }
  }
    enableNotifications();
}, []);
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/article/:slug" element={<Article />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <BackToTop />
    </HashRouter>
  );
}
