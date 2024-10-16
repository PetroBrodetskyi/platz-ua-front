import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';
import { fetchCurrentUser } from '../../redux/features/authSlice';
import scss from './Footer.module.scss';

const Footer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        await dispatch(fetchCurrentUser()).unwrap();
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [dispatch, token]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <footer className={scss.footer}>
      <div className={scss.container}>
        <div className={scss.title}>
          <p>&copy; {new Date().getFullYear()} PlatzUA</p>
        </div>
        <div>
          <ul className={scss.linksList}>
            <li className={scss.link}>
              <button
                className={scss.linkButton}
                onClick={() => handleNavigation('/how-it-works')}
              >
                Покупцям та продавцям
              </button>
            </li>
            <li className={scss.link}>
              <button
                className={scss.linkButton}
                onClick={() => handleNavigation('/terms-of-service')}
              >
                Умови використання
              </button>
            </li>
            <li className={scss.link}>
              <button
                className={scss.linkButton}
                onClick={() => handleNavigation('/privacy-policy')}
              >
                Політика конфіденційності
              </button>
            </li>
          </ul>
        </div>
        <div className={scss.adminButton}>
          {!isLoading && user && user.subscription === 'admin' && (
            <button onClick={() => handleNavigation('/admin')}>
              <FaUserShield className={scss.icon} />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
