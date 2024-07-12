import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TitleFavorite from '../ProductCard/TitleFavorite/TitleFavorite';
import CreateCondition from '../ProductCard/CreateCondition/CreateCondition';
import scss from './ProductDetails.module.scss';

const ProductDetails = () => {
  const { productId } = useParams();
  const products = useSelector((state) => state.products.products);
  const exchangeRate = useSelector((state) => state.products.exchangeRate);
  const product = products.find((product) => product._id === productId);

  if (!product) {
    return <p>Продукт не знайдено</p>;
  }

  const priceInUAH = exchangeRate !== null ? (product.price * exchangeRate).toFixed(2) : 'N/A';

  return (
    <div className={scss.productDetails}>
      <div>
        <div className={scss.images}>
          {product.image1 && <img src={product.image1} alt={product.name} />}
          {product.image2 && <img src={product.image2} alt={product.name} />}
          {product.image3 && <img src={product.image3} alt={product.name} />}
        </div>
      </div>
      <div>
        <div className={scss.namePrice}>
          <h2>{product.name}</h2>
          <div>
            <p>€ {product.price}</p>
            <p>₴ {priceInUAH}</p>
          </div>
        </div>
        <p>{product.description}</p>
        <CreateCondition addedDate={product.createdAt} condition={product.condition} />
        <p>PLZ: {product.PLZ}</p>
        <p>Місто: {product.city}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
