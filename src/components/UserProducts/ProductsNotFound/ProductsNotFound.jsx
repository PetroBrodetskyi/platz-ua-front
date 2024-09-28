import scss from "./ProductsNotFound.module.scss";

const ProductsNotFound = () => {
  return (
    <div className={scss.notFound}>
      <h3>Ви ще не додали оголошення</h3>
    </div>
  );
};

export default ProductsNotFound;
