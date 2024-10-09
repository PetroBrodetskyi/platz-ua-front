import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import LinearDeterminate from '../LinearDeterminate/LinearDeterminate';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import SplashScreen from '../SplashScreen/SplashScreen';
import scss from './AppBar.module.scss';

const Home = lazy(() => import('../../pages/Home/Home'));
const Cart = lazy(() => import('../Cart/Cart'));
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const RegisterPage = lazy(
  () => import('../../pages/RegisterPage/RegisterPage')
);
const AddProductPage = lazy(
  () => import('../../pages/AddProductPage/AddProductPage')
);
const FavoritesPage = lazy(
  () => import('../../pages/FavoritesPage/FavoritesPage')
);
const ProductDetailPage = lazy(
  () => import('../../pages/ProductDetailPage/ProductDetailPage')
);
const UserProductsPage = lazy(
  () => import('../../pages/UserProductsPage/UserProductsPage')
);
const HowItWorksPage = lazy(
  () => import('../../pages/HowItWorksPage/HowItWorksPage')
);
const UserProfilePage = lazy(
  () => import('../../pages/UserProfilePage/UserProfilePage')
);
const AdminPage = lazy(() => import('../../pages/AdminPage/AdminPage'));

const AppBar = () => {
  const [loading, setLoading] = useState(false);
  const navigationType = useNavigationType();
  const location = useLocation();
  const navigate = useNavigate();

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
          <Suspense fallback={null}>
            <Routes>
              <Route
                path="/email-verified"
                element={
                  <SplashScreen
                    onFinish={() => navigate('/login')}
                    message={{
                      title: 'Ваш e-mail підтверджено',
                      text: 'Виконується перенаправлення на сторінку авторизації...'
                    }}
                  />
                }
              />
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/create" element={<AddProductPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route
                path="/product/:productId"
                element={<ProductDetailPage />}
              />
              <Route path="/user/:userId" element={<UserProductsPage />} />
              <Route
                path="/user-profile/:userId"
                element={<UserProfilePage />}
              />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route
                path="/admin"
                element={<PrivateRoute element={<AdminPage />} />}
              />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AppBar;
