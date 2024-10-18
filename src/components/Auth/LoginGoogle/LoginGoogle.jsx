import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogin } from '../../redux/authSlice';
import scss from './LoginGoogle.module.scss';

const LoginGoogle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSuccess = async (response) => {
    const token = response.credential;
    const decoded = jwt_decode(token);
    const { name, email, picture } = decoded;

    try {
      const res = await dispatch(
        googleLogin({ name, email, avatarURL: picture, token })
      ).unwrap();
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
      <div className={scss.googleLogin}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
        />
      </div>
    </div>
  );
};

export default LoginGoogle;
