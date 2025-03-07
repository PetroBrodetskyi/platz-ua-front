import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogin } from '../../../redux/features/authSlice';
import { useTheme } from '../../../context/ThemeContext';
import scss from './LoginGoogle.module.scss';

const LoginGoogle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const theme = isDarkMode ? 'filled_black' : 'outline';

  const handleGoogleSuccess = async (response) => {
    const token = response.credential;
    try {
      const res = await dispatch(googleLogin({ token })).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  const handleGoogleFailure = () => {
    console.log('Login failed');
  };

  return (
    <div>
      <div className={`${scss.googleLogin} ${isDarkMode ? scss.darkMode : ''}`}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
          width="300"
          height="100"
          theme={theme}
          shape="pill"
          size="medium"
        />
      </div>
    </div>
  );
};

export default LoginGoogle;
