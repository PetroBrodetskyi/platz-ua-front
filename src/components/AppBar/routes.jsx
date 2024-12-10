import { lazy } from 'react';
import SplashScreen from '../SplashScreen/SplashScreen';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import { useNavigate } from 'react-router-dom';

const Home = lazy(() => import('../../pages/Home/Home'));
const FilterPage = lazy(() => import('../../pages/FilterPage/FilterPage'));
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
const ChatPage = lazy(() => import('../../pages/ChatPage/ChatPage'));
const ChatsPage = lazy(() => import('../../pages/ChatsPage/ChatsPage'));
const FollowPage = lazy(() => import('../../pages/FollowPage/FollowPage'));
const HowItWorksPage = lazy(
  () => import('../../pages/HowItWorksPage/HowItWorksPage')
);
const InfoPage = lazy(() => import('../../pages/InfoPage/InfoPage'));
const AdminPage = lazy(() => import('../../pages/AdminPage/AdminPage'));

export const routes = [
  { path: '/', element: <Home /> },
  { path: '/filter', element: <FilterPage /> },
  { path: '/category/:category', element: <Home /> },
  { path: '/category/:category/:subcategory', element: <Home /> },
  { path: '/cart', element: <Cart /> },
  { path: '/auth', element: <AuthPage /> },
  { path: '/create', element: <AddProductPage /> },
  { path: '/favorites', element: <FavoritesPage /> },
  { path: '/product/:productId', element: <ProductDetailPage /> },
  { path: '/user/:userId', element: <UserProductsPage /> },
  { path: '/user-profile/:userId', element: <UserProfilePage /> },
  { path: '/follow', element: <FollowPage /> },
  { path: '/chats', element: <ChatsPage /> },
  { path: '/chat/:chatId', element: <ChatPage /> },
  { path: '/how-it-works', element: <HowItWorksPage /> },
  { path: '/info/terms-of-service', element: <InfoPage /> },
  { path: '/info/privacy-policy', element: <InfoPage /> },
  {
    path: '/admin',
    element: <PrivateRoute element={<AdminPage />} />
  },
  {
    path: '/email-verified',
    element: (
      <SplashScreen
        onFinish={() => useNavigate()('/auth')}
        message={{
          title: 'Ваш e-mail підтверджено',
          text: 'Виконується перенаправлення на сторінку авторизації...'
        }}
      />
    )
  },
  { path: '*', element: <NotFoundPage /> }
];
