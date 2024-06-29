import ProductCard from '../ProductCard/ProductCard';
import scss from './ProductList.module.scss';

const ProductList = () => {
  return (
    <div className={scss.productList}>
      <div className={scss.container}>
        <h2>Найновіші</h2>
        <ul className={scss.listFlex}>
          <ProductCard />
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
