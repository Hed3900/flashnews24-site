import "./CategoryBar.css";

const categories = [
  "General",
  "World",
  "India",
  "Politics",
  "Business",
  "Technology",
  "Sports",
  "Entertainment",
  "Science"
];

const category =
  fullPost.labels?.find(label => categories.includes(label)) || "General";
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
