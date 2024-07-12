import scss from './ProductInfo.module.sxss';
import CreateCondition from '../../ProductCard/CreateCondition/CreateCondition';
import CartPrice from '../../ProductCard/CartPrice/CartPrice';

const ProductInfo = ({ product, exchangeRate }) => {
  return (
    <div className={scss.details}>
      <div className={scss.namePrice}>
        <h2>{product.name}</h2>
        {exchangeRate !== null && (
          <div className={scss.priceContainer}>
            <CartPrice price={product.price} exchangeRate={exchangeRate} />
          </div>
        )}
      </div>
      <p>{product.description}</p>
      <CreateCondition addedDate={product.createdAt} condition={product.condition} />
      <p>PLZ: {product.PLZ}</p>
      <p>Місто: {product.city}</p>
    </div>
  );
};

export default ProductInfo;
