import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogin } from '../../../redux/features/authSlice';

const LoginGoogle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <div>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
        />
      </div>
    </div>
  );
};

export default LoginGoogle;
