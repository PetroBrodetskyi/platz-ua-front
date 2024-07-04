import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    async function verifyEmail() {
      try {
        const response = await axios.post('https://platz-ua-back.vercel.app/api/users/verify-email', { token });
        
        if (response.data.success) {
          navigate('/login?message=Email successfully verified');
        } else {
          navigate('/login?message=Email verification failed');
        }
      } catch (error) {
        console.error('Error verifying email:', error);
        navigate('/login?message=Email verification failed');
      }
    }

    if (token) {
      verifyEmail();
    } else {
      console.error('Token not found in URL');
      navigate('/login?message=Token not found');
    }
  }, [location, navigate]);

  return (
    <div>
      <p>Verifying email...</p>
    </div>
  );
};

export default VerifyEmailPage;