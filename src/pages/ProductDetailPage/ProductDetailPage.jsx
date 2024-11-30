import CreateAdButton from '../../components/CreateAdButton/CreateAdButton';
import ProductDetail from '../../components/ProductDetails/ProductDetails';
import VipList from '../../components/VipList';
import scss from './ProductDetailPage.module.scss';

const ProductDetailPage = () => {
  return (
    <div>
      <ProductDetail />
      <div className={scss.container}>
        <VipList />
      </div>
      <CreateAdButton />
    </div>
  );
};

export default ProductDetailPage;
