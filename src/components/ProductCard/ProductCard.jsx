import TitleFavorite from './TitleFavorite/TitleFavorite';
import CartPrice from './CartPrice/CartPrice';
import scss from '../ProductCard/ProductCard.module.scss';

const ProductCard = () => {
  const products = [
    { id: 1, name: 'Газонокосарка', price: '€100', description: 'Потужна газонокосарка для вашого саду', condition: 'Новий', addedDate: '2024-06-29' },
    { id: 2, name: 'Пилосос', price: '€200', description: 'Високоякісний пилосос з великою потужністю', condition: 'Б/в', addedDate: '2024-06-28' },
    { id: 3, name: 'Диван', price: '€300', description: 'Зручний та стильний диван для вашого дому', condition: 'Новий', addedDate: '2024-06-27' },
    { id: 4, name: 'Матрац', price: '€100', description: 'Комфортний матрац для здорового сну', condition: 'Б/в', addedDate: '2024-06-26' },
    { id: 5, name: 'Велосипед', price: '€200', description: 'Спортивний велосипед для активного відпочинку', condition: 'Новий', addedDate: '2024-06-25' },
    { id: 6, name: 'Mazda 6', price: '€300', description: 'Надійний автомобіль з відмінними характеристиками', condition: 'Б/в', addedDate: '2024-06-24' },
  ];

  return (
    <>
      {products.map((product) => (
        <li key={product.id} className={scss.productItem}>
          <div className={scss.product}>
            <div className={scss.productImage}>
              <img src={`https://via.placeholder.com/300?text=${product.name}`} alt={product.name} />
            </div>
            <div className={scss.productInfo}>
              <TitleFavorite name={product.name} />
              <p>{product.description}</p>
              <p>{product.condition}</p>
              <CartPrice price={product.price} addedDate={product.addedDate} />
            </div>
          </div>
        </li>
      ))}
    </>
  );
};

export default ProductCard;
