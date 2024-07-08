import scss from './CartPrice.module.scss';

const CartPrice = ({ price, addedDate, exchangeRate }) => {
  const priceInUAH = (price * exchangeRate).toFixed(2);

  return (
    <div className={scss.dateCartPrice}>
      <p className={scss.addedDate}>{addedDate}</p>
      <div className={scss.cartPrice}>
        <div className={scss.priceContainer}>
          <p className={scss.priceInUAH}>₴{priceInUAH}</p>
          <p className={scss.productPrice}>€{price}</p>
        </div>
      </div>
    </div>
  );
};

export default CartPrice;
