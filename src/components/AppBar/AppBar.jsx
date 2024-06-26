import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import scss from './AppBar.module.scss';
import Categories from '../Categories/Categories';
import ProductList from '../ProductList/ProductList';
import Footer from '../Footer/Footer';
import Home from '../../pages/Home/Home';

const AppBar = () => {
  return (
    <div className={scss.wrapper}>
      <Header />
      <div className={scss.appBar}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default AppBar;
