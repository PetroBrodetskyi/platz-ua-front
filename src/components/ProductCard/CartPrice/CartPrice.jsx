import { PiShoppingCart } from "react-icons/pi";
import scss from './CartPrice.module.scss';

const CartPrice = ({ price, addedDate }) => {
  return (
    <div className={scss.dateCartPrice}>
            <p className={scss.addedDate}>{addedDate}</p>
        <div className={scss.cartPrice}>
            <PiShoppingCart className={scss.cartIcon} />
            <p className={scss.productPrice}>{price}</p>
        </div>
    </div>
  );
};

export default CartPrice;
