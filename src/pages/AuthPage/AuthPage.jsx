import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginForm from '../../components/Auth/LoginForm/LoginForm';
import RegisterForm from '../../components/Auth/RegisterForm/RegisterForm';

const AuthPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const message = params.get('message');

    useEffect(() => {
        if (message) {
            alert(message);
        }
    }, [message]);

    return (
        <div>
            {location.pathname === '/auth/login' ? <LoginForm /> : <RegisterForm />}
        </div>
    );
};

export default AuthPage;
