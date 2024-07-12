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
const FavoritesPage = lazy(() => import('../../pages/FavoritesPage/FavoritesPage'));
const ProductDetailPage = lazy(() => import('../../pages/ProductDetailPage/ProductDetailPage'));
const UserPage = lazy(() => import('../../pages/UserPage/UserPage'));

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
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/product/:productId" element={<ProductDetailPage />} />
              <Route path="/user" element={<UserPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AppBar;
