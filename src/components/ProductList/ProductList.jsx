import ProductCard from '../ProductCard/ProductCard';
import scss from './ProductList.module.scss';

const ProductList = () => {
  return (
    <div className={scss.productList}>
      <div className={scss.container}>
        <h2>Найновіші</h2>
        <ProductCard />
      </div>
    </div>
  );
};

export default ProductList;