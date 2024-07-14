import Categories from '../../components/Categories/Categories';
import ProductList from '../../components/ProductList/ProductList';
import CreateAdButton from '../../components/CreateAdButton/CreateAdButton';

const Home = () => {
  return (
    <div>
      <Categories />
      <ProductList />
      <CreateAdButton />
    </div>
  );
};

export default Home;
