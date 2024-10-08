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
      <div className={scss.cartPrice}>
        <p className={scss.priceInUAH}>₴{priceInUAH}</p>
        <div className={scss.priceContainer}>
          <p className={scss.productPrice}>€{price}</p>
          <Tooltip
            title={isInCart ? 'Видалити з кошика' : 'Додати у кошик'}
            arrow
          >
            <button
              className={`${scss.icon} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`}
              onClick={onAddToCart}
              type="button"
            >
              {isInCart ? <PiShoppingCartFill /> : <PiShoppingCart />}
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default CartPrice;
