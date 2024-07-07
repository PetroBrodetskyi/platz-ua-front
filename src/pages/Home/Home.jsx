import Categories from '../../components/Categories/Categories';
import ProductList from '../../components/ProductList/ProductList';
import CreateAdButton from '../../components/CreateAdButton/CreateAdButton';

const Home = () => {
  return (
    <main>
      <Categories />
      <ProductList />
      <CreateAdButton />
    </main>
  );
};

export default Home;
