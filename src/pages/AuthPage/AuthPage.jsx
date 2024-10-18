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
      {/* <div className={scss.cards}>
          <RandomCards />
        </div> */}
      <div className={scss.formContainer}>
        <h4>Увійдіть за допомогою електронної пошти або через Google</h4>
        <div className={scss.formWrapper}>
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <div className={scss.googleLoginWrapper}>
            <LoginGoogle />
          </div>
        </div>
        <p className={scss.registerText}>
          Після реєстрації за допомогою електронної пошти, будь ласка, перевірте
          вашу поштову скриньку та натисніть на посилання у листі для
          підтвердження.
        </p>
        <p>
          Під час реєстрації на нашому веб-сайті ви надаєте свої персональні
          дані, включаючи, але не обмежуючись, ім'ям, електронною поштою та
          іншою інформацією, яка може бути необхідна для надання наших послуг.
        </p>
        <p>
          Ми обробляємо ваші дані відповідно до законодавства України та
          Німеччини, включаючи, але не обмежуючись, Загальним регламентом
          захисту даних (GDPR) та Законом України про захист персональних даних.
          Обробка ваших даних здійснюється лише в тих цілях, для яких ви їх
          надали, і з дотриманням всіх необхідних заходів для забезпечення їх
          безпеки.
        </p>
        <p>
          Надаючи свої дані, ви підтверджуєте, що ознайомлені з нашою
          <a href="/privacy-policy" className={scss.privacyLink}>
            {' '}
            <b>політикою конфіденційності </b>
          </a>
          та даєте свою згоду на обробку ваших персональних даних для зазначених
          цілей. Ви також маєте право в будь-який час відкликати свою згоду,
          зв'язавшись з нами за вказаними контактними даними.
        </p>
      </div>
      <div className={scss.cards}>
        <RandomCards />
      </div>
    </div>
  );
};

export default AuthPage;
