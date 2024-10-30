import scss from './ProductsNotFound.module.scss';

const ProductsNotFound = () => {
  return (
    <div className={scss.notFound}>
      <p className={scss.text}>Немає оголошень</p>
    </div>
  );
};

export default ProductsNotFound;
