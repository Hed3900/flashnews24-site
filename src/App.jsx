import { useState } from "react";

import Header from "./components/Header";
import BreakingTicker from "./components/BreakingTicker";
import CategoryBar from "./components/CategoryBar";
import Home from "./pages/Home";

export default function App() {

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
