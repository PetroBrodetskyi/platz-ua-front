import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';
import { fetchCurrentUser } from '../../redux/features/authSlice';
import scss from './Footer.module.scss';

const Footer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token]);

  const navigateToHowItWorks = () => {
    navigate('/how-it-works');
  };

  const navigatePrivacyPolicy = () => {
    navigate('/privacy-policy');
  };

  return (
    <footer className={scss.footer}>
      <div className={scss.container}>
        <div className={scss.title}>
          <p>&copy; {new Date().getFullYear()} PlatzUA</p>
        </div>
        <div className={scss.linksContainer}>
          <div>
            <button className={scss.linkButton} onClick={navigateToHowItWorks}>
              Покупцям та продавцям
            </button>
          </div>
          <div>
            <button className={scss.linkButton} onClick={navigatePrivacyPolicy}>
              Політика конфіденційності
            </button>
          </div>
        </div>
        <div className={scss.adminButton}>
          {!loading && user && user.subscription === 'admin' && (
            <button onClick={() => navigate('/admin')}>
              <FaUserShield className={scss.icon} />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
