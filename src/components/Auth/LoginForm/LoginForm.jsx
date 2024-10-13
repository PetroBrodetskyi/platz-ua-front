import { useState, useEffect } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { RiEyeCloseLine } from 'react-icons/ri';
import { HiOutlineEye } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/features/authSlice';
import { addToCartBack } from '../../../redux/features/cartSlice';
import SplashScreen from '../../SplashScreen/SplashScreen';
import SubmitButton from '../../SubmitButton/SubmitButton';
import scss from './LoginForm.module.scss';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [splashVisible, setSplashVisible] = useState(false);
  const [splashMessage, setSplashMessage] = useState({ title: '', text: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useSelector((state) => state.auth);

  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    setSplashVisible(true);
    setSplashMessage({
      title: 'Виконується вхід',
      text: 'Будь ласка, зачекайте...'
    });
    try {
      const result = await dispatch(login(data)).unwrap();
      const userName = result?.user?.name || 'користувач';
      localStorage.setItem('notification', `Привіт, ${userName}`);

      const cartFromLocalStorage =
        JSON.parse(localStorage.getItem('cart')) || [];
      if (cartFromLocalStorage.length) {
        for (const product of cartFromLocalStorage) {
          await dispatch(addToCartBack(product));
        }
        localStorage.removeItem('cart');
      }

      setSplashMessage({
        title: 'Успішно увійшли',
        text: 'Виконується перенаправлення на головну сторінку...'
      });

      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      setSplashMessage({
        title: 'Помилка входу',
        text: 'Не вдалося увійти. Перевірте ваші дані.'
      });
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const message = params.get('message');
    if (message) {
      alert(message);
    }
  }, [location]);

  return (
    <section className={scss.auth}>
      {splashVisible ? (
        <SplashScreen
          onFinish={() => setSplashVisible(false)}
          message={splashMessage}
        />
      ) : (
        <div className={scss.form}>
          <div>
            <ul className={scss.authNav}>
              <li>
                <NavLink className={scss.classNavLink} to="/auth?type=register">
                  Реєстрація
                </NavLink>
              </li>
              <li>
                <NavLink className={scss.classNavLink} to="/auth?type=login">
                  Вхід
                </NavLink>
              </li>
            </ul>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={scss.authForm}>
            <div>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="text"
                placeholder="Введіть ваш email"
              />
              {errors.email && (
                <p className={scss.error}>{errors.email.message}</p>
              )}
            </div>

            <div className={scss.inputWrapper}>
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  }
                })}
                type={showPassword ? 'text' : 'password'}
                placeholder="Введіть ваш пароль"
              />
              <button
                type="button"
                className={scss.eye}
                onClick={passwordVisibility}
              >
                {showPassword ? (
                  <HiOutlineEye color="grey" />
                ) : (
                  <RiEyeCloseLine color="grey" />
                )}
              </button>
              {errors.password && (
                <p className={scss.error}>{errors.password.message}</p>
              )}
            </div>

            <div className={scss.buttonWrapper}>
              <SubmitButton
                buttonText="Логін"
                onSubmit={handleSubmit(onSubmit)}
                disabled={loading}
              />
            </div>
            {error && <p className={scss.error}>{error}</p>}
          </form>
        </div>
      )}
    </section>
  );
};

export default LoginForm;
