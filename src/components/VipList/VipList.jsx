import VipProductCard from '../VipList/VipProductCard';
import scss from './VipList.module.scss';

const VipList = () => {
  return (
    <div className={scss.productListWrapper}>
      <div className={scss.vipProductList}>
        <div className={scss.container}>
          <VipProductCard />
        </div>
      </div>
    </div>
  );
};

export default VipList;
