import {
  addToCartBack,
  removeFromCartBack,
  fetchProductsInCart,
  setCartItems
} from '../../redux/features/cartSlice';
import Skeleton from '@mui/material/Skeleton';
import scss from './ProductCard.module.scss';

export const handleAddToCart = async (
  product,
  isInCart,
  owners,
  cartItems,
  dispatch,
  setNotification
) => {
  const productWithOwner = { ...product, owner: owners[product.owner] };

  if (isInCart) {
    await dispatch(removeFromCartBack(product._id));
    dispatch(fetchProductsInCart());
    const updatedCartItems = cartItems.filter(
      (item) => item._id !== product._id
    );
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    dispatch(setCartItems(updatedCartItems));
  } else {
    await dispatch(addToCartBack(product));
    dispatch(fetchProductsInCart());
    const updatedCartItems = [...cartItems, product];
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    dispatch(setCartItems(updatedCartItems));
  }

  setNotification(
    `${product.name} ${isInCart ? 'видалено з кошика' : 'додано до кошика'}!`
  );
};

export const renderSkeletons = (count, viewMode) => {
  return Array.from({ length: count }).map((_, index) => (
    <li key={index}>
      <Skeleton
        variant="rectangular"
        animation="pulse"
        className={`${scss.skelet} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`}
      />
      <div>
        <Skeleton variant="text" width="100%" animation="pulse" />
        <Skeleton variant="text" width="80%" animation="pulse" />
        <Skeleton variant="text" width="60%" animation="pulse" />
        <Skeleton variant="text" width="100%" animation="pulse" />
      </div>
    </li>
  ));
};
