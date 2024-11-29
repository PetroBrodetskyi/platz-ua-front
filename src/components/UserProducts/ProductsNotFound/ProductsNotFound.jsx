import scss from './ProductsNotFound.module.scss';

const ProductsNotFound = () => {
  return (
    <div className={scss.notFound}>
      <h3 className={scss.text}>Немає активних оголошень</h3>
    </div>
  );
};

export default ProductsNotFound;
