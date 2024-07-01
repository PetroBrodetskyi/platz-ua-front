import { Routes, Route } from 'react-router-dom';
import scss from './AppBar.module.scss';
import Header from '../Header/Header';
import Categories from '../Categories/Categories';
import ProductList from '../ProductList/ProductList';
import Footer from '../Footer/Footer';
import Home from '../../pages/Home/Home';
import Cart from '../Cart/Cart';
import AuthPage from '../../pages/AuthPage/AuthPage';
import AddProductPage from '../../pages/AddProductPage/AddProductPage';

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
            <Route path="/auth/:id" element={<AuthPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="/add-product" element={<AddProductPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AppBar;
