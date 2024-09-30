import { useState, useEffect } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { RiEyeCloseLine } from 'react-icons/ri';
import { HiOutlineEye } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/features/authSlice';
import css from './LoginForm.module.scss';
import SubmitButton from '../../SubmitButton/SubmitButton';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useSelector((state) => state.auth);

  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(login(data)).unwrap();
      const userName = result?.user?.name || 'користувач';
      localStorage.setItem('notification', `Привіт, ${userName}`);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      localStorage.setItem(
        'notification',
        'Не вдалося увійти. Перевірте ваші дані.'
      );
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
    <section className={css.auth}>
      <div className={css.form}>
        <div>
          <ul className={css.authNav}>
            <li>
              <NavLink className={css.classNavLink} to="/register">
                Реєстрація
              </NavLink>
            </li>
            <li>
              <NavLink className={css.classNavLink} to="/login">
                Вхід
              </NavLink>
            </li>
          </ul>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={css.authForm}>
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
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div className={css.inputWrapper}>
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
              className={css.eye}
              onClick={passwordVisibility}
            >
              {showPassword ? (
                <HiOutlineEye color="grey" />
              ) : (
                <RiEyeCloseLine color="grey" />
              )}
            </button>
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div className={css.buttonWrapper}>
            <SubmitButton
              buttonText="Логін"
              onSubmit={handleSubmit(onSubmit)}
              disabled={loading}
            />
          </div>
          {error && <p className={css.error}>{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
