import "./CategoryBar.css";

const categories = [
  "All",
  "World",
  "India",
  "Politics",
  "Business",
  "Technology",
  "Sports",
  "Entertainment",
];

export default function CategoryBar({
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <div className="category-bar">
      {categories.map((cat) => (
        <button
          key={cat}
          className={selectedCategory === cat ? "active" : ""}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
