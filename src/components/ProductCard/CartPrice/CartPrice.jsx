import { PiShoppingCart, PiShoppingCartFill } from 'react-icons/pi';
import Tooltip from '@mui/material/Tooltip';
import scss from './CartPrice.module.scss';

const CartPrice = ({
  price,
  exchangeRate,
  onAddToCart,
  isInCart,
  viewMode
}) => {
  const priceInUAH = (price * exchangeRate).toFixed(2);

  return (
    <div className={scss.cartPriceContainer}>
      <button type="button" className={scss.cartPrice} onClick={onAddToCart}>
        <p className={scss.priceInUAH}>₴{priceInUAH}</p>
        <div className={scss.priceContainer}>
          <p className={scss.productPrice}>€{price}</p>
          <Tooltip
            title={isInCart ? 'Видалити з кошика' : 'Додати у кошик'}
            arrow
          >
            <div
              className={`${scss.icon} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`}
            >
              {isInCart ? <PiShoppingCartFill /> : <PiShoppingCart />}
            </div>
          </Tooltip>
        </div>
      </button>
    </div>
  );
};

export default CartPrice;
