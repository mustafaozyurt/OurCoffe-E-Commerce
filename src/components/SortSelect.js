import "./SortSelect.css";

const SortSelect = ({ onChange }) => {
  const sortOptions = [
    { value: "", label: "Sort By" },
    { value: "a-z", label: "A-Z" },
    { value: "z-a", label: "Z-A" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ];

  return (
    <select id="sort" className="sort__select" onChange={onChange}>
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SortSelect;
