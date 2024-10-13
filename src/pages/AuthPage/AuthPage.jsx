import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RegisterForm from '../../components/Auth/RegisterForm/RegisterForm';
import LoginForm from '../../components/Auth/LoginForm/LoginForm';
import LoginGoogle from '../../components/Auth/LoginGoogle/LoginGoogle';
import RandomCards from '../../components/RandomCards/RandomCards';
import scss from './AuthPage.module.scss';

const AuthPage = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    setIsLogin(type !== 'register');
  }, [location]);

  return (
    <div className={scss.authPage}>
      <RandomCards />
      <div className={scss.formContainer}>
        <div className={scss.formWrapper}>
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <div className={scss.googleLoginWrapper}>
            <h4>Або увійдіть через:</h4>
            <LoginGoogle />
          </div>
        </div>
      </div>
      <RandomCards />
    </div>
  );
};

export default AuthPage;
