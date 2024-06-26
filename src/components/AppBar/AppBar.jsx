import { Routes, Route } from 'react-router-dom';
import scss from './AppBar.module.scss';
import Header from '../Header/Header';
import Categories from '../Categories/Categories';
import ProductList from '../ProductList/ProductList';
import Footer from '../Footer/Footer';
import Home from '../../pages/Home/Home';
import Cart from '../Cart/Cart';

const AppBar = () => {
  return (
    <div className={scss.wrapper}>
      <Header />
      <div className={scss.appBar}>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AppBar;
