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

    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      try {
        const token = await getToken(messaging, {
          vapidKey: "BNOWKXK21uLfihl_fg5BfRWkRH99kHGkZa5L-n7Oyhwj8b4FGrNRSBiV-ttSQQ3KMTbTIdLT2WU7gfvJ5O74jH0",
        });

        alert("Notification setup started");
      } catch (err) {
        console.error("FCM Error:", err);
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
