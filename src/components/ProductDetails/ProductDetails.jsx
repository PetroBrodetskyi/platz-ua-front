import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';
import {
  fetchProductById,
  selectProductById,
  selectLoading,
  selectError
} from '../../redux/features/productsSlice';
import { selectOwner, fetchUserById } from '../../redux/features/authSlice';
import {
  fetchProductsInCart,
  addToCartBack,
  removeFromCartBack
} from '../../redux/features/cartSlice';
import Notification from '../Notification/Notification';
import Tooltip from '@mui/material/Tooltip';
import Gallery from './Gallery/Gallery';
import SubmitButton from '../SubmitButton';
import ProductInfo from './ProductInfo/ProductInfo';
import UserInfo from './UserInfo/UserInfo';
import Loader from '../Loader/Loader';
import Map from '../../components/Map';
import Comments from '../Comments/Comments';
import { TbLocation } from 'react-icons/tb';
import { GrLocation } from 'react-icons/gr';
import { HiOutlineEye } from 'react-icons/hi';
import { MdOutlineDateRange } from 'react-icons/md';
import { FaRegFaceSmile, FaRegFaceMeh } from 'react-icons/fa6';
import scss from './ProductDetails.module.scss';

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const [notification, setNotification] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [loadingCoordinates, setLoadingCoordinates] = useState(true);
  const product = useSelector((state) => selectProductById(state, productId));
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const owner = useSelector(selectOwner);
  const cartItems = useSelector((state) => state.cart.items);

  const fetchCoordinates = async (plz, city) => {
    try {
      setLoadingCoordinates(true);
      const response = await axios.get(
        'https://platz-ua-back.vercel.app/api/locations'
      );
      const location = response.data.find(
        (loc) =>
          loc.plz === Number(plz) &&
          loc.city.trim().toLowerCase() === city.trim().toLowerCase()
      );
      if (location) {
        setCoordinates({
          latitude: location.latitude,
          longitude: location.longitude
        });
      } else {
        console.warn('Location not found for the given PLZ and city');
      }
    } catch (err) {
      console.error('Error fetching coordinates:', err);
    } finally {
      setLoadingCoordinates(false);
    }
  };

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductById(productId));
    } else {
      if (product.owner) {
        dispatch(fetchUserById(product.owner));
      }
      if (product.PLZ && product.city) {
        fetchCoordinates(product.PLZ, product.city);
      }
    }
    dispatch(fetchProductsInCart());
  }, [dispatch, product, productId]);

  const handleAddToCart = async () => {
    const isInCart = cartItems.some((item) => item._id === product._id);
    const productWithOwner = { ...product, owner };

    if (isInCart) {
      await dispatch(removeFromCartBack(product._id));
      setNotification(`${product.name} видалено з кошика!`);
    } else {
      await dispatch(addToCartBack(productWithOwner));
      setNotification(`${product.name} додано до кошика!`);
    }

    dispatch(fetchProductsInCart());
  };

  if (loading) return <Loader />;
  if (error) return <p>Помилка завантаження даних: {error}</p>;
  if (!product) return <p>Продукт не знайдено</p>;

  const isInCart = cartItems.some((item) => item._id === product._id);

  return (
    <div className={scss.product}>
      <UserInfo owner={owner} />
      <div className={scss.container}>
        <div className={scss.infoContainer}>
          <Tooltip title="PLZ / індекс" placement="left">
            <p className={scss.detail}>
              <TbLocation className={scss.icon} /> {product.PLZ}
            </p>
          </Tooltip>
          <Tooltip title="Місто" placement="left">
            <p className={scss.detail}>
              <GrLocation className={scss.icon} /> {product.city}
            </p>
          </Tooltip>
          <Tooltip title="Стан" placement="left">
            <p className={scss.detail}>
              {product.condition === 'новий' ? (
                <>
                  <FaRegFaceSmile className={scss.icon} /> новий
                </>
              ) : (
                <>
                  <FaRegFaceMeh className={scss.icon} /> вживаний
                </>
              )}
            </p>
          </Tooltip>
          <Tooltip title="Переглядів" placement="left">
            <p className={scss.detail}>
              <HiOutlineEye className={scss.icon} /> {product.views || 'N/A'}
            </p>
          </Tooltip>
          <Tooltip title="Дата розміщення" placement="left">
            <p className={scss.detail}>
              <MdOutlineDateRange className={scss.icon} />{' '}
              {new Date(product.createdAt).toLocaleDateString()}
            </p>
          </Tooltip>
        </div>
        <div className={scss.gallery}>
          <Gallery images={product} />
        </div>
        <div className={scss.infoFlex}>
          <div className={scss.productInfo}>
            <ProductInfo
              product={product}
              handleAddToCart={handleAddToCart}
              isInCart={isInCart}
            />
          </div>
          <SubmitButton
            buttonText={isInCart ? 'У кошику' : 'У кошик'}
            onClick={handleAddToCart}
          />
        </div>
      </div>
      <div className={scss.mapContainer}>
        <h3 className={scss.title}>На карті</h3>
        <div className={scss.mapInfoContainer}>
          <p className={scss.mapInfo}>
            На карті відображено місцезнаходження населеного пункту, зазначеного
            продавцем при створенні оголошення. Це дозволяє приблизно оцінити,
            де знаходиться товар або послуга. Для отримання точної адреси
            зверніться до продавця під час обговорення деталей.
          </p>
          <div className={scss.map}>
            {loadingCoordinates ? (
              <Skeleton
                variant="rectangular"
                animation="pulse"
                width="100%"
                height="400px"
                style={{ borderRadius: '8px' }}
              />
            ) : coordinates ? (
              <Map
                latitude={coordinates.latitude}
                longitude={coordinates.longitude}
                plz={product.PLZ}
                city={product.city}
              />
            ) : (
              <p>Координати не знайдено</p>
            )}
          </div>
        </div>
      </div>
      <div className={scss.comments}>
        <Comments productId={productId} />
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

export default ProductDetails;
