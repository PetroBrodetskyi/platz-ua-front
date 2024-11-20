import CreateAdButton from '../../components/CreateAdButton/CreateAdButton';
import ProductDetail from '../../components/ProductDetails/ProductDetails';
import RandomCards from '../../components/RandomCards/RandomCards';
import scss from './ProductDetailPage.module.scss';

const ProductDetailPage = () => {
  return (
    <div>
      <ProductDetail />
      {/* <div className={scss.random}>
        <h3 className={scss.title}>Вас можуть зацікавити</h3>
        <RandomCards />
      </div> */}
      <CreateAdButton />
    </div>
  );
};

export default ProductDetailPage;
