import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginForm from '../../components/Auth/LoginForm/LoginForm';

const LoginPage = () => {
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
            <LoginForm />
        </div>
    );
};

export default LoginPage;
