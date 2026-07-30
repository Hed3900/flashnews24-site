import { HashRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";
import Search from "./pages/Search";

import Header from "./components/Header";
import BreakingTicker from "./components/BreakingTicker";
import CategoryBar from "./components/CategoryBar";
import BackToTop from "./components/BackToTop";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Category from "./pages/Category";

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

  alert("Function started");

  const permission = await Notification.requestPermission();

  alert("Permission: " + permission);

  if (permission === "granted") {
    try {
      alert("Getting token...");

      const token = await getToken(messaging, {
        vapidKey: "NEE_VAPID_KEY",
      });

      alert("Token:\n" + token);
    } catch (err) {
      alert("FCM Error: " + err.message);
      console.error(err);
    }
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
