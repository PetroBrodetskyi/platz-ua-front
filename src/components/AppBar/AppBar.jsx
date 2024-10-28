import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import LinearDeterminate from '../LinearDeterminate/LinearDeterminate';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import SplashScreen from '../SplashScreen/SplashScreen';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import Loader from '../Loader/Loader';
import scss from './AppBar.module.scss';

const Home = lazy(() => import('../../pages/Home/Home'));
const Cart = lazy(() => import('../Cart/Cart'));
const AuthPage = lazy(() => import('../../pages/AuthPage/AuthPage'));
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
const UserProfilePage = lazy(
  () => import('../../pages/UserProfilePage/UserProfilePage')
);
const FollowPage = lazy(() => import('../../pages/FollowPage/FollowPage'));
const HowItWorksPage = lazy(
  () => import('../../pages/HowItWorksPage/HowItWorksPage')
);
const PrivacyPolicyPage = lazy(
  () => import('../../pages/PrivacyPolicyPage/PrivacyPolicyPage')
);
const TermsOfServicePage = lazy(
  () => import('../../pages/TermsOfServicePage/TermsOfServicePage')
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
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [navigationType, location]);

  const loadingContent = useMemo(() => <Loader />, [loading]);

  const routes = [
    { path: '/', element: <Home /> },
    { path: '/cart', element: <Cart /> },
    { path: '/auth', element: <AuthPage /> },
    { path: '/create', element: <AddProductPage /> },
    { path: '/favorites', element: <FavoritesPage /> },
    { path: '/product/:productId', element: <ProductDetailPage /> },
    { path: '/user/:userId', element: <UserProductsPage /> },
    { path: '/user-profile/:userId', element: <UserProfilePage /> },
    { path: '/follow', element: <FollowPage /> },
    { path: '/how-it-works', element: <HowItWorksPage /> },
    { path: '/terms-of-service', element: <TermsOfServicePage /> },
    { path: '/privacy-policy', element: <PrivacyPolicyPage /> },
    {
      path: '/admin',
      element: <PrivateRoute element={<AdminPage />} />
    },
    {
      path: '/email-verified',
      element: (
        <SplashScreen
          onFinish={() => navigate('/auth')}
          message={{
            title: 'Ваш e-mail підтверджено',
            text: 'Виконується перенаправлення на сторінку авторизації...'
          }}
        />
      )
    },
    { path: '*', element: <NotFoundPage /> }
  ];

  return (
    <div className={scss.wrapper}>
      <Header />
      <LinearDeterminate loading={loading} />
      <div className={scss.appBar}>
        <main>
          <ScrollToTop />
          <Suspense fallback={loadingContent}>
            <Routes>
              {routes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AppBar;
