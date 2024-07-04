import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../../components/Auth/LoginForm/LoginForm';
import RegisterForm from '../../components/Auth/RegisterForm/RegisterForm';

const AuthPage = () => {
    const { pathname, search } = useLocation();
    const params = new URLSearchParams(search);
    const message = params.get('message');

    return (
        <div>
            {message && <div>{message}</div>}
            {pathname.includes('login') ? <LoginForm /> : <RegisterForm />}
        </div>
    );
};

export default AuthPage;
