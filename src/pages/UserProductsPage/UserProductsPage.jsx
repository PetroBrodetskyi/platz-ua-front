import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserById } from '../../redux/features/authSlice';
import {
  fetchUserProducts,
  fetchUsersPublicProducts
} from '../../redux/features/productsSlice';
import CreateAdButton from '../../components/CreateAdButton';
import ProfileButton from '../../components/ProfileButton';
import UserProducts from '../../components/UserProducts';
import RandomCards from '../../components/RandomCards';

import scss from './UserProductsPage.module.scss';

const UserProductsPage = () => {
  const { userId } = useParams();
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.owner);
  const currentUser = useSelector((state) => state.auth.user);
  const userProducts = useSelector((state) => state.products.userProducts);

  useEffect(() => {
    if (userId) {
      if (currentUser && currentUser._id === userId) {
        dispatch(fetchUserProducts());
      } else {
        dispatch(fetchUsersPublicProducts(userId));
      }
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId, currentUser]);

  useEffect(() => {
    setProducts(userProducts);
  }, [userProducts]);

  const isCurrentUser = currentUser && currentUser._id === userId;

  return (
    <div>
      <div className={scss.userPage}>
        {user ? (
          <div>
            <UserProducts products={products} setProducts={setProducts} />
            <CreateAdButton />
            {isCurrentUser && <ProfileButton />}
          </div>
        ) : (
          <p>Завантаження даних...</p>
        )}
      </div>

      <div className={scss.random}>
        <h3>Вас також можуть зацікавити</h3>
        <RandomCards />
      </div>
    </div>
  );
};

export default UserProductsPage;
