import { HashRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Search from "./pages/Search";

import Header from "./components/Header";
import BreakingTicker from "./components/BreakingTicker";
import CategoryBar from "./components/CategoryBar";

import Home from "./pages/Home";
import Article from "./pages/Article";

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
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/article/:slug" element={<Article />} />
<Route path="/search" element={<Search />} />
      </Routes>
    </HashRouter>
  );
}
