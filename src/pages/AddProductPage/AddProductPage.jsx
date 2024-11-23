import AddProductForm from '../../components/AddProductForm/AddProductForm';
import RandomCards from '../../components/RandomCards/RandomCards';
import scss from './AddProductPage.module.scss';

const AddProductPage = () => {
  return (
    <div className={scss.productPage}>
      <AddProductForm />
      <div className={scss.random}>
        <h3 className={scss.title}>Вас можуть зацікавити</h3>
        <RandomCards />
      </div>
    </div>
  );
};

export default AddProductPage;
