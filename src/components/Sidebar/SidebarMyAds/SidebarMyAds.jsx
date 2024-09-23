import { useSelector, useDispatch } from 'react-redux';
import { Collapse } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { fetchUserProducts } from '../../../redux/features/productsSlice';
import SidebarMyAdItem from '../SidebarMyAdItem/SidebarMyAdItem';
import scss from './SidebarMyAds.module.scss';

const SidebarMyAds = () => {
  const dispatch = useDispatch();
  const userProducts = useSelector((state) => state.products.userProducts);

  const handleRemoveFromMyAds = (productId) => {
    dispatch(fetchUserProducts(productId));
  };

  return (
    <div className={scss.sidebarMyAds}>
      {userProducts.length === 0 ? (
        <p>У вас немає власних оголошень</p>
      ) : (
        <ul className={scss.myAdsList}>
          <TransitionGroup className={scss.list}>
            {userProducts.map((product) => (
              <Collapse key={product._id} timeout={500}>
                <SidebarMyAdItem
                  product={product}
                  onRemove={handleRemoveFromMyAds}
                />
              </Collapse>
            ))}
          </TransitionGroup>
        </ul>
      )}
    </div>
  );
};

export default SidebarMyAds;
