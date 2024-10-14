import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import * as jwt_decode from 'jwt-decode';
import scss from './LoginGoogle.module.scss';

const LoginGoogle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSuccess = (response) => {
    const token = response.credential;
    const decoded = jwt_decode(token);

    console.log('Google Token:', token);
    console.log('Google User Data:', decoded);

    dispatch(login({ googleToken: token }));
    navigate('/');
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
