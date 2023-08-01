import "./Category.css";

const Category = ({ show, children, onClick, className }) => {

  const categoriesMobileClass = ["categories__mobile"];

  if (show) {
    categoriesMobileClass.push("show");
  }

  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};

export default Category;
