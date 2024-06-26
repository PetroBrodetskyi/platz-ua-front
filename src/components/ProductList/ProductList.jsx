import scss from './ProductList.module.scss';

const ProductList = () => {
  const products = [
    { id: 1, name: 'Product 1', price: '$100' },
    { id: 2, name: 'Product 2', price: '$200' },
    { id: 3, name: 'Product 3', price: '$300' },
    { id: 4, name: 'Product 1', price: '$100' },
    { id: 5, name: 'Product 2', price: '$200' },
    { id: 6, name: 'Product 3', price: '$300' },
  ];

  return (
    <div className={scss.productList}>
      <div className={scss.container}>
        <h2>Popular Products</h2>
        <ul className={scss.listFlex}>
          {products.map((product) => (
            <li key={product.id} className={scss.productItem}>
              <div className={scss.product}>
                <div className={scss.productImage}>
                  <img src={`https://via.placeholder.com/150?text=${product.name}`} alt={product.name} />
                </div>
                <div className={scss.productInfo}>
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
