import { Routes, Route } from 'react-router-dom';
import scss from './AppBar.module.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../../pages/Home/Home';
import Cart from '../Cart/Cart';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import AddProductPage from '../../pages/AddProductPage/AddProductPage';


const AppBar = () => {
  return (
    <div className={scss.wrapper}>
      <Header />
      <div className={scss.appBar}>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/create" element={<AddProductPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AppBar;
