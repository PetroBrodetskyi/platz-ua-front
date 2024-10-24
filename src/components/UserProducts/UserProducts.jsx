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
      <h3 className={scss.title}>Оголошення автора</h3>
      <div className={scss.userInfo}>
        <div>
          {owner && (
            <div className={scss.container}>
              <img
                src={owner.avatarURL}
                alt="User Avatar"
                className={scss.avatar}
              />
              <p className={scss.userName}>{owner.name}</p>
              <p>На сайті з {formattedDate}</p>
              <p className={scss.about}>{owner.about}</p>
              <div className={scss.socialLinks}>
                {owner.facebook && (
                  <a
                    href={owner.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={scss.userLink}
                  >
                    <FaFacebook className={scss.icon} />
                    Facebook
                  </a>
                )}
                {owner.instagram && (
                  <a
                    href={owner.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={scss.userLink}
                  >
                    <FaInstagram className={scss.icon} />
                    Instagram
                  </a>
                )}
                {owner.linkedin && (
                  <a
                    href={owner.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={scss.userLink}
                  >
                    <FaLinkedin className={scss.icon} />
                    Linkedin
                  </a>
                )}
                {owner.telegram && (
                  <a
                    href={owner.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={scss.userLink}
                  >
                    <FaTelegram className={scss.icon} />
                    Telegram
                  </a>
                )}
                {owner.site && (
                  <a
                    href={owner.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={scss.userLink}
                  >
                    <FaGlobe className={scss.icon} />
                    Website
                  </a>
                )}
              </div>
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
