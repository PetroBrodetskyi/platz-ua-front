import ProductItem from '../ProductItem';
import scss from '../AdminDashboard.module.scss';

const ProductList = ({
  products,
  owners,
  updateProductStatus,
  handleEdit,
  deleteProduct
}) => {
  if (products.length === 0) {
    return <p>Немає оголошень з таким статусом.</p>;
  }

  return (
    <ul className={scss.productList}>
      {products.map((product) => (
        <ProductItem
          key={product._id}
          product={product}
          owner={owners[product.owner]}
          updateProductStatus={updateProductStatus}
          handleEdit={handleEdit}
          deleteProduct={deleteProduct}
        />
      ))}
    </ul>
  );
};

export default ProductList;
