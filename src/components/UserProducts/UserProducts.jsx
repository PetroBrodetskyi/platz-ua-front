import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaGlobe
} from 'react-icons/fa';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import scss from './UserProducts.module.scss';
import ProductItem from './ProductItem/ProductItem';
import Notification from '../Notification/Notification';
import ProductsNotFound from '../UserProducts/ProductsNotFound/ProductsNotFound';
import SubmitButton from '../SubmitButton';
import Loader from '../Loader/Loader';
import { fetchExchangeRate } from '../../redux/features/productsSlice';
import { fetchUserById } from '../../redux/features/authSlice';
import axiosInstance from '../../redux/axiosConfig';
import UserAvatars from '../UserProducts/UserAvatars';

const UserProducts = ({ products }) => {
  const [notification, setNotification] = useState('');
  const [isFollowing, setIsFollowing] = useState(null);
  const [followersData, setFollowersData] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const owner = useSelector((state) => state.auth.owner);
  const loading = useSelector((state) => state.products.loading);
  const exchangeRate = useSelector((state) => state.products.exchangeRate);
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

  useEffect(() => {
    const fetchFollowingStatus = async () => {
      if (!owner) return;

      try {
        const { data } = await axiosInstance.get(`/users/${owner._id}`);
        setIsFollowing(data.followers.includes(owner._id));

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
      }
    };

    fetchFollowingStatus();
  }, [owner]);

  const handleFollowClick = async () => {
    const endpoint = isFollowing
      ? `/users/${owner._id}/unfollow`
      : `/users/${owner._id}/follow`;

    setIsFollowing((prev) => !prev);

    try {
      await axiosInstance.patch(endpoint);
      setNotification(
        isFollowing
          ? 'Ви більше не відстежуєте автора.'
          : 'Ви успішно підписалися на автора!'
      );

      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Error updating follow status:', error);
      setIsFollowing((prev) => !prev);
      setNotification('Помилка при оновленні підписки');
    }
  };

  if (isLoadingData || loading) return <Loader />;
  if (!products.length) return <ProductsNotFound />;

  return (
    <div className={`${scss.userProducts} ${isLoadingData ? '' : scss.loaded}`}>
      <div className={scss.titleContainer}>
        <h3 className={scss.title}>Оголошення автора</h3>
        <div className={scss.followers}>
          <h4>Стежить:</h4>
          <UserAvatars users={followingData} />
        </div>
        <div className={scss.followers}>
          <h4>Читачі:</h4>
          <UserAvatars users={followersData} />
        </div>
      </div>
      <div className={scss.userInfo}>
        {owner && (
          <div className={scss.container}>
            <img
              src={owner.avatarURL}
              alt="User Avatar"
              className={scss.avatar}
            />
            <div>
              <h3 className={scss.userName}>{owner.name}</h3>
              {owner.plz || owner.city ? (
                <p>{`${owner.plz || ''} ${owner.city || ''}`.trim()}</p>
              ) : null}
            </div>

            <div className={scss.buttons}>
              {isFollowing !== null && (
                <SubmitButton
                  buttonText={isFollowing ? 'Відстежується' : 'Стежити'}
                  onClick={handleFollowClick}
                />
              )}
              <SubmitButton buttonText="Повідомлення" onClick={() => {}} />
            </div>
            <p className={scss.about}>{owner.about}</p>
            <div className={scss.socialLinks}>
              {owner.facebook && (
                <a
                  href={owner.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={scss.userLink}
                >
                  <FaFacebook className={scss.icon} /> Facebook
                </a>
              )}
              {owner.instagram && (
                <a
                  href={owner.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={scss.userLink}
                >
                  <FaInstagram className={scss.icon} /> Instagram
                </a>
              )}
              {owner.linkedin && (
                <a
                  href={owner.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={scss.userLink}
                >
                  <FaLinkedin className={scss.icon} /> Linkedin
                </a>
              )}
              {owner.telegram && (
                <a
                  href={owner.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={scss.userLink}
                >
                  <FaTelegram className={scss.icon} /> Telegram
                </a>
              )}
              {owner.site && (
                <a
                  href={owner.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={scss.userLink}
                >
                  <FaGlobe className={scss.icon} /> Website
                </a>
              )}
              <p>На сайті з {formattedDate}</p>
            </div>
          </div>
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
