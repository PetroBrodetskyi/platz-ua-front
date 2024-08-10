import { Routes, Route, useNavigationType, useLocation } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
import scss from './AppBar.module.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';
import LinearDeterminate from '../LinearDeterminate/LinearDeterminate';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const Home = lazy(() => import('../../pages/Home/Home'));
const Cart = lazy(() => import('../Cart/Cart'));
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage/RegisterPage'));
const AddProductPage = lazy(() => import('../../pages/AddProductPage/AddProductPage'));
const FavoritesPage = lazy(() => import('../../pages/FavoritesPage/FavoritesPage'));
const ProductDetailPage = lazy(() => import('../../pages/ProductDetailPage/ProductDetailPage'));
const UserPage = lazy(() => import('../../pages/UserPage/UserPage'));
const HowItWorksPage = lazy(() => import('../../pages/HowItWorksPage/HowItWorksPage'));
const AdminPage = lazy(() => import('../../pages/AdminPage/AdminPage'));

const AppBar = () => {
  const [loading, setLoading] = useState(false);
  const navigationType = useNavigationType();
  const location = useLocation();

  useEffect(() => {
    if (navigationType === 'PUSH') {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [location, navigationType]);

  return (
    <div className={scss.wrapper}>
      <Header />
      <LinearDeterminate loading={loading} />
      <div className={scss.appBar}>
        <main>
          <ScrollToTop />
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/create" element={<AddProductPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/product/:productId" element={<ProductDetailPage />} />
              <Route path="/user/:userId" element={<UserPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/admin" element={<PrivateRoute element={<AdminPage />} />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AppBar;
