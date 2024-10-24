import scss from './ProductsNotFound.module.scss';

const ProductsNotFound = () => {
  return (
    <div className={scss.notFound}>
      <h3>Немає оголошень</h3>
    </div>
  );
};

export default ProductsNotFound;
