import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/Auth/RegisterForm/RegisterForm';
import LoginForm from '../../components/Auth/LoginForm/LoginForm';
import RandomCards from '../../components/RandomCards/RandomCards';
import scss from './AuthPage.module.scss';

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    setIsLogin(type !== 'register');
  }, [location]);

  const handleToggleForm = (formType) => {
    navigate(`/auth?type=${formType}`);
  };

  return (
    <div className={scss.authPage}>
      <div className={scss.authNav}>
        <ul>
          <li>
            <button
              className={scss.classNavLink}
              onClick={() => handleToggleForm('register')}
            >
              Реєстрація
            </button>
          </li>
          <li>
            <button
              className={scss.classNavLink}
              onClick={() => handleToggleForm('login')}
            >
              Вхід
            </button>
          </li>
        </ul>
      </div>
      <div className={scss.formWrapper}>
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
      <RandomCards />
    </div>
  );
};

export default AuthPage;
