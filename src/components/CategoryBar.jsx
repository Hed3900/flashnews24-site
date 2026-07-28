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

export default function CategoryBar() {
  return (
    <div className="category-bar">
      {categories.map((cat) => (
        <button key={cat}>{cat}</button>
      ))}
    </div>
  );
}
