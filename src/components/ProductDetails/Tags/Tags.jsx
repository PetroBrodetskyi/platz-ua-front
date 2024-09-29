import { HiOutlineEye } from "react-icons/hi";
import { getCategoryIcon, getSubcategoryIcon } from "../../Categories/icons";
import scss from "./Tags.module.scss";

const Categories = ({ product }) => {
  return (
    <div className={scss.tags}>
      <div className={scss.tag}>
        <p>переглядів: </p>
        <HiOutlineEye className={scss.icon} />
        <div>{product.views !== undefined ? product.views : "N/A"}</div>
      </div>
      <p className={scss.category}>
        {product.category} {getCategoryIcon(product.category)}
      </p>
      <p className={scss.category}>
        {product.subcategory1} {getSubcategoryIcon(product.subcategory1)}
      </p>
      {product.subcategory2 && (
        <p className={scss.category}>
          {product.subcategory2} {getSubcategoryIcon(product.subcategory2)}
        </p>
      )}
      {product.subcategory3 && (
        <p className={scss.category}>
          {product.subcategory3} {getSubcategoryIcon(product.subcategory3)}
        </p>
      )}
    </div>
  );
};

export default Categories;
