import { getCategoryIcon, getSubcategoryIcon } from '../../Categories/icons';
import scss from './Tags.module.scss';

const Categories = ({ product }) => {
  return (
    <div className={scss.tags}>
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
