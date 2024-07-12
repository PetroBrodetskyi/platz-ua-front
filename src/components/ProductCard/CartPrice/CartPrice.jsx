import { PiShoppingCart } from "react-icons/pi";
import scss from './CartPrice.module.scss';

const CartPrice = ({ price, exchangeRate }) => {
  const priceInUAH = (price * exchangeRate).toFixed(2);

  return (
    <div className={scss.cartPriceContainer}>
      <button type="submit" className={scss.cartPrice}>
        <p className={scss.priceInUAH}>₴{priceInUAH}</p>
        <div className={scss.priceContainer}>
          <div><PiShoppingCart /></div>
          <p className={scss.productPrice}>€{price}</p>
        </div>
      </button>
    </div>
  );
};

export default CartPrice;
