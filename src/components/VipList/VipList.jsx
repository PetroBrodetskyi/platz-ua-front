import ProductCard from '../VipList/ProductCard';
import scss from './VipList.module.scss';

const VipList = () => {
  return (
    <div className={scss.productListWrapper}>
      <div className={scss.productList}>
        <div className={scss.header}>
          <h3 className={scss.title}>VIP-оголошення</h3>
        </div>
        <div className={scss.container}>
          <ProductCard />
        </div>
      </div>
    </div>
  );
};

export default VipList;
