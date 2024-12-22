import ProductDetail from '../../components/ProductDetails/ProductDetails';
import VipList from '../../components/VipList';
import scss from './ProductDetailPage.module.scss';

const ProductDetailPage = () => {
  return (
    <div>
      <ProductDetail />
      <h3 className={scss.title}>VIP-оголошення</h3>
      <div className={scss.container}>
        <VipList />
      </div>
    </div>
  );
};

export default ProductDetailPage;
