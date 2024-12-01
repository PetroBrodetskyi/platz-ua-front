import { useState, useEffect, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import Loader from '../Loader';
import Notification from '../Notification';
import ProductsNotFound from '../UserProducts/ProductsNotFound';
import { fetchExchangeRate } from '../../redux/features/productsSlice';
import {
  fetchUserById,
  setFollowingStatus,
  selectIsFollowing
} from '../../redux/features/authSlice';
import axiosInstance from '../../redux/axiosConfig';
import UserInfo from './UserInfo';
import UserAvatars from '../UserProducts/UserAvatars';
import scss from './UserProducts.module.scss';

const ProductItem = lazy(() => import('./ProductItem'));
const ArchiveProductItem = lazy(() => import('./ArchiveProductItem'));

const UserProducts = ({ products }) => {
  const [notification, setNotification] = useState('');
  const [followersData, setFollowersData] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const [loadingState, setLoadingState] = useState({
    userData: true,
    avatars: true
  });
  const owner = useSelector((state) => state.auth.owner);
  const loading = useSelector((state) => state.products.loading);
  const exchangeRate = useSelector((state) => state.products.exchangeRate);
  const isFollowing = useSelector(selectIsFollowing);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formattedDate = owner
    ? format(new Date(owner.createdAt), 'MMMM yyyy', { locale: uk })
    : '';

  const filteredProducts = products.filter(
    (product) => product.status === 'approved' || product.status === 'vip'
  );
  const archiveProducts = products.filter(
    (product) => product.status === 'archive'
  );

  useEffect(() => {
    const fetchData = async () => {
      if (products.length > 0 && !owner) {
        try {
          const ownerId = products[0].owner;
          await Promise.all([
            dispatch(fetchUserById(ownerId)).unwrap(),
            dispatch(fetchExchangeRate()).unwrap()
          ]);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoadingState((prev) => ({ ...prev, userData: false }));
        }
      } else {
        setLoadingState((prev) => ({ ...prev, userData: false }));
      }
    };
    fetchData();
  }, [dispatch, products, owner]);

  useEffect(() => {
    const fetchFollowingStatus = async () => {
      if (!owner) return;

      try {
        const { data } = await axiosInstance.get(`/users/${owner._id}`);
        setFollowersData(data.followers);
        setFollowingData(data.following);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setNotification('Помилка при отриманні даних користувача');
      } finally {
        setLoadingState((prev) => ({ ...prev, avatars: false }));
      }
    };

    fetchFollowingStatus();
  }, [owner, isFollowing]);

  const handleFollowClick = async () => {
    const endpoint = isFollowing
      ? `/users/${owner._id}/unfollow`
      : `/users/${owner._id}/follow`;

    try {
      await axiosInstance.patch(endpoint);
      dispatch(setFollowingStatus(!isFollowing));
      setNotification(
        isFollowing
          ? 'Ви більше не відстежуєте автора.'
          : 'Ви успішно підписалися!'
      );
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Error updating follow status:', error);
      setNotification('Помилка при оновленні підписки');
    }
  };

  const handleFollowersClick = () => {
    navigate('/follow', { state: { tab: 'followers' } });
  };

  const handleFollowingClick = () => {
    navigate('/follow', { state: { tab: 'following' } });
  };

  if (loadingState.userData || loading) return <Loader />;

  return (
    <div
      className={`${scss.userProducts} ${loadingState.userData ? '' : scss.loaded}`}
    >
      <div className={scss.titleContainer}>
        <h3 className={scss.title}>Оголошення автора</h3>
        <div
          className={`${scss.followContainer} ${scss.desktopFollowContainer}`}
        >
          <div className={scss.followers} onClick={handleFollowingClick}>
            <h4>Стежить:</h4>
            <UserAvatars
              users={followingData}
              isLoading={loadingState.avatars}
            />
          </div>
          <div className={scss.followers} onClick={handleFollowersClick}>
            <h4>Читачі:</h4>
            <UserAvatars
              users={followersData}
              isLoading={loadingState.avatars}
            />
          </div>
        </div>
      </div>

      <div className={scss.userInfo}>
        {owner && (
          <UserInfo
            owner={owner}
            followingData={followingData}
            followersData={followersData}
            isFollowing={isFollowing}
            handleFollowClick={handleFollowClick}
            formattedDate={formattedDate}
          />
        )}
        <div className={scss.filteredContainer}>
          {filteredProducts.length > 0 ? (
            <Suspense fallback={<Loader />}>
              <ul className={scss.productsList}>
                {filteredProducts.map((product) => (
                  <ProductItem
                    key={product._id}
                    product={product}
                    exchangeRate={exchangeRate}
                  />
                ))}
              </ul>
            </Suspense>
          ) : (
            <ProductsNotFound />
          )}
          {archiveProducts.length > 0 && (
            <div>
              <h3 className={scss.sectionTitle}>Архів</h3>
              <Suspense fallback={<Loader />}>
                <ul className={scss.productsList}>
                  {archiveProducts.map((product) => (
                    <ArchiveProductItem
                      key={product._id}
                      product={product}
                      exchangeRate={exchangeRate}
                    />
                  ))}
                </ul>
              </Suspense>
            </div>
          )}
        </div>
      </div>
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification('')}
        />
      )}
    </div>
  );
};

export default UserProducts;
