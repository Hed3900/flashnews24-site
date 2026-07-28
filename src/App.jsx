import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import BreakingTicker from "./components/BreakingTicker";
import CategoryBar from "./components/CategoryBar";

import Home from "./pages/Home";
import Article from "./pages/Article";

function Layout() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <>
      <Header />

      <BreakingTicker />

      <CategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <Home
        selectedCategory={selectedCategory}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </BrowserRouter>
  );
}
