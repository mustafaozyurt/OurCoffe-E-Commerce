import "./Category.css";

const Category = ({ children, onClick, className }) => {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};

export default Category;
