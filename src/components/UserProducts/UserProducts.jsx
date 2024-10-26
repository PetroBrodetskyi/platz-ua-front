import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import ProductItem from './ProductItem/ProductItem';
import Notification from '../Notification/Notification';
import ProductsNotFound from '../UserProducts/ProductsNotFound/ProductsNotFound';
import Loader from '../Loader/Loader';
import { fetchExchangeRate } from '../../redux/features/productsSlice';
import {
  fetchUserById,
  setFollowingStatus,
  selectIsFollowing
} from '../../redux/features/authSlice';
import axiosInstance from '../../redux/axiosConfig';
import UserAvatars from '../UserProducts/UserAvatars';
import UserInfo from './UserInfo';
import scss from './UserProducts.module.scss';

const UserProducts = ({ products }) => {
  const [notification, setNotification] = useState('');
  const [followersData, setFollowersData] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [areAvatarsLoading, setAreAvatarsLoading] = useState(true);
  const owner = useSelector((state) => state.auth.owner);
  const loading = useSelector((state) => state.products.loading);
  const exchangeRate = useSelector((state) => state.products.exchangeRate);
  const isFollowing = useSelector(selectIsFollowing);

  const dispatch = useDispatch();

  const formattedDate = owner
    ? format(new Date(owner.createdAt), 'MMMM yyyy', { locale: uk })
    : '';

  useEffect(() => {
    const fetchData = async () => {
      if (products.length > 0) {
        try {
          const ownerId = products[0].owner;
          await Promise.all([
            dispatch(fetchUserById(ownerId)).unwrap(),
            dispatch(fetchExchangeRate()).unwrap()
          ]);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoadingData(false);
        }
      }
    };

    fetchData();
  }, [dispatch, products]);

  const fetchFollowingStatus = async () => {
    if (!owner) return;

    try {
      const { data } = await axiosInstance.get(`/users/${owner._id}`);
      const fetchUsers = async (userIds) =>
        Promise.all(
          userIds.map((userId) => axiosInstance.get(`/users/${userId}`))
        );

      const followersResponses = await fetchUsers(data.followers);
      const followingResponses = await fetchUsers(data.following);

      setFollowersData(followersResponses.map((res) => res.data));
      setFollowingData(followingResponses.map((res) => res.data));
    } catch (error) {
      console.error('Error fetching user data:', error);
      setNotification('Помилка при отриманні даних користувача');
    } finally {
      setAreAvatarsLoading(false);
    }
  };

  useEffect(() => {
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

  if (isLoadingData || loading) return <Loader />;
  if (!products.length) return <ProductsNotFound />;

  return (
    <div className={`${scss.userProducts} ${isLoadingData ? '' : scss.loaded}`}>
      <div className={scss.titleContainer}>
        <h3 className={scss.title}>Оголошення автора</h3>
        <div
          className={`${scss.followContainer} ${scss.desktopFollowContainer}`}
        >
          <div className={scss.followers}>
            <h4>Стежить:</h4>
            <UserAvatars users={followingData} areLoading={areAvatarsLoading} />
          </div>
          <div className={scss.followers}>
            <h4>Читачі:</h4>
            <UserAvatars users={followersData} areLoading={areAvatarsLoading} />
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
