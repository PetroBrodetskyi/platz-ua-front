import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import scss from './UserProducts.module.scss';
import ProductItem from './ProductItem/ProductItem';
import Notification from '../Notification/Notification';
import ProductsNotFound from '../UserProducts/ProductsNotFound/ProductsNotFound';
import Loader from '../Loader/Loader';
import { fetchExchangeRate } from '../../redux/features/productsSlice';
import { fetchUserById } from '../../redux/features/authSlice';

const UserProducts = ({ products, setProducts }) => {
  const [notification, setNotification] = useState('');
  const currentUser = useSelector((state) => state.auth.user);
  const owner = useSelector((state) => state.auth.owner);
  const loading = useSelector((state) => state.products.loading);
  const exchangeRate = useSelector((state) => state.products.exchangeRate);
  const dispatch = useDispatch();

  const formattedDate =
    owner && format(new Date(owner.createdAt), 'MMMM yyyy', { locale: uk });

  useEffect(() => {
    if (products.length > 0) {
      dispatch(fetchUserById(products[0].owner));
    }
  }, [dispatch, products]);

  useEffect(() => {
    dispatch(fetchExchangeRate());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (!products.length) return <ProductsNotFound />;

  return (
    <div className={scss.userProducts}>
      <h3>Оголошення автора</h3>
      <div className={scss.userInfo}>
        <div className={scss.container}>
          {owner && (
            <div className={scss.userInfoFlex}>
              <img
                src={owner.avatarURL}
                alt="User Avatar"
                className={scss.avatar}
              />
              <p className={scss.userName}>{owner.name}</p>
              <p>На сайті з {formattedDate}</p>
            </div>
          )}
        </div>
        <div>
          <ul className={scss.productsList}>
            {products.map((product) => (
              <ProductItem
                key={product._id}
                product={product}
                exchangeRate={exchangeRate}
              />
            ))}
          </ul>
          {notification && (
            <Notification
              message={notification}
              onClose={() => setNotification('')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProducts;
