import { Suspense, useEffect, useMemo, useState } from 'react';
import {
  Routes,
  Route,
  useNavigationType,
  useLocation
} from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import LinearDeterminate from '../LinearDeterminate';
import ScrollToTop from '../ScrollToTop';
import CookieBanner from '../CookieBanner';
import Loader from '../Loader';
import { routes } from './routes';
import scss from './AppBar.module.scss';

const AppBar = () => {
  const [loading, setLoading] = useState(false);
  const navigationType = useNavigationType();
  const location = useLocation();

  useEffect(() => {
    if (navigationType === 'PUSH') {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [navigationType, location]);

  const loadingContent = useMemo(() => <Loader />, [loading]);

  return (
    <div className={scss.wrapper}>
      <CookieBanner />
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
