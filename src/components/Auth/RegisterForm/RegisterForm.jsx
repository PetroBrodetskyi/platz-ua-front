import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { RiEyeCloseLine } from 'react-icons/ri';
import { HiOutlineEye } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { register as registerUser } from '../../../redux/features/authSlice.js';
import SubmitButton from '../../SubmitButton/SubmitButton';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import SplashScreen from '../../SplashScreen/SplashScreen';
import { useTheme } from '../../../context/ThemeContext';
import './register.css';
import scss from './RegisterForm.module.scss';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneValid, setPhoneValid] = useState(true);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const { isDarkMode } = useTheme();
  const passwordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    setIsFormSubmitted(true);
    if (!phoneValid || !isAgreed) return;
    try {
      await dispatch(registerUser(data)).unwrap();
      setShowSplash(true);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    setValue('phone', value, { shouldValidate: true });
    setPhoneTouched(true);
  };

  useEffect(() => {
    setPhoneValid(validatePhoneNumber(phone));
  }, [phone]);

  const validatePhoneNumber = (value) => {
    if (typeof value !== 'string' || !value.trim()) return false;
    const phoneNumber = parsePhoneNumberFromString(value, 'UA');
    return phoneNumber && phoneNumber.isValid();
  };

  if (showSplash) {
    return (
      <SplashScreen
        message={{
          title: 'Реєстрація успішна!',
          text: 'Підтвердіть ваш email. Йде перенаправлення на головну сторінку...'
        }}
        onFinish={() => navigate('/')}
      />
    );
  }

  return (
    <section className={scss.auth}>
      <div className={scss.form}>
        <div>
          <ul className={scss.authNav}>
            <li>
              <NavLink className={scss.classNavLink} to="/auth?type=register">
                <span className={scss.navigate}>Реєстрація</span>
              </NavLink>
            </li>
            <li>
              <NavLink className={scss.classNavLink} to="/auth?type=login">
                <span className={scss.navigate}>Вхід</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={scss.authForm}>
          <div>
            <input
              {...register('firstName', { required: "Ім'я є обов'язковим" })}
              type="text"
              placeholder="Введіть ваше ім'я"
              className={`${scss.input} ${isDarkMode ? scss.darkMode : ''}`}
            />
            {errors.firstName && (
              <p className={scss.error}>{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <input
              {...register('lastName', { required: "Прізвище є обов'язковим" })}
              type="text"
              placeholder="Введіть ваше прізвище"
              className={`${scss.input} ${isDarkMode ? scss.darkMode : ''}`}
            />
            {errors.lastName && (
              <p className={scss.error}>{errors.lastName.message}</p>
            )}
          </div>

          <div className={scss.phoneInputContainer}>
            <PhoneInput
              placeholder="Введіть ваш номер телефону"
              value={phone}
              onChange={handlePhoneChange}
              defaultCountry="DE"
              international
              onBlur={() => setPhoneTouched(true)}
              className={`${scss.input} ${isDarkMode ? scss.darkMode : ''}`}
            />
            {!phoneValid && phoneTouched && (
              <p className={scss.error}>Невірний номер телефону</p>
            )}
          </div>

          <div>
            <input
              {...register('email', {
                required: "Email є обов'язковим",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Невірний формат email адреси'
                }
              })}
              type="text"
              placeholder="Введіть ваш email"
              className={`${scss.input} ${isDarkMode ? scss.darkMode : ''}`}
            />
            {errors.email && (
              <p className={scss.error}>{errors.email.message}</p>
            )}
          </div>

          <div className={scss.inputWrapper}>
            <input
              {...register('password', {
                required: "Пароль є обов'язковим",
                minLength: {
                  value: 8,
                  message: 'Пароль повинен містити щонайменше 8 символів'
                }
              })}
              type={showPassword ? 'text' : 'password'}
              placeholder="Введіть ваш пароль"
              className={`${scss.input} ${isDarkMode ? scss.darkMode : ''}`}
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

          <div className={scss.inputWrapper}>
            <input
              {...register('confirmPassword', {
                required: "Підтвердження паролю є обов'язковим",
                validate: (value) =>
                  value === watch('password') || 'Паролі повинні збігатися'
              })}
              type={showPassword ? 'text' : 'password'}
              placeholder="Підтвердіть ваш пароль"
              className={`${scss.input} ${isDarkMode ? scss.darkMode : ''}`}
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
            {errors.confirmPassword && (
              <p className={scss.error}>{errors.confirmPassword.message}</p>
            )}
          </div>
          <div className={scss.checkboxContainer}>
            <label htmlFor="privacyPolicy" className={scss.checkboxLabel}>
              <input
                type="checkbox"
                id="privacyPolicy"
                checked={isAgreed}
                onChange={() => setIsAgreed(!isAgreed)}
                className={
                  isFormSubmitted && !isAgreed
                    ? scss.errorCheckbox
                    : scss.checkbox
                }
              />
              <span className={scss.agree}> Я погоджуюсь з </span>
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className={scss.privacyLink}
              >
                <span className={scss.text}>політикою конфіденційності</span>
              </a>
            </label>
          </div>

          <div className={scss.buttonWrapper}>
            <SubmitButton
              buttonText="Реєстрація"
              onSubmit={onSubmit}
              disabled={loading || !isAgreed}
            />
          </div>

          {error && <p className={scss.error}>{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default RegisterForm;
