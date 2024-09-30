import AddProductForm from '../../components/AddProductForm/AddProductForm';
import scss from './AddProductPage.module.scss';

const AddProductPage = () => {
  return (
    <div className={scss.productPage}>
      <AddProductForm />
    </div>
  );
};

export default AddProductPage;
