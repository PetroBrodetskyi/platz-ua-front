import VipProductCard from '../VipList/VipProductCard';
import scss from './VipList.module.scss';

const VipList = () => {
  return (
    <div className={scss.productListWrapper}>
      <div className={scss.productList}>
        <div className={scss.header}>
          <h3 className={scss.title}>VIP-оголошення</h3>
        </div>
        <div className={scss.container}>
          <VipProductCard />
        </div>
      </div>
    </div>
  );
};

export default VipList;