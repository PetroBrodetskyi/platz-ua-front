import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import scss from './LoginGoogle.module.scss';

const LoginGoogle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSuccess = async (response) => {
    const token = response.credential;
    const decoded = jwt_decode(token);
    const { name, email, picture } = decoded;

    try {
      const res = await axios.post('https://platz-ua-back/api/auth/google', {
        name,
        email,
        avatarURL: picture,
        token
      });
      dispatch(login({ user: res.data.user, token: res.data.token }));
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
