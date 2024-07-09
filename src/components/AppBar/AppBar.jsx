import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import scss from './AppBar.module.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';

const Home = lazy(() => import('../../pages/Home/Home'));
const Cart = lazy(() => import('../Cart/Cart'));
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage/RegisterPage'));
const AddProductPage = lazy(() => import('../../pages/AddProductPage/AddProductPage'));
const Favorite = lazy(() => import('../../pages/Favorites/Favorites'));

const AppBar = () => {
  return (
    <div className={scss.wrapper}>
      <Header />
      <div className={scss.appBar}>
        <main>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/create" element={<AddProductPage />} />
              <Route path="/favorite" element={<Favorite />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AppBar;
