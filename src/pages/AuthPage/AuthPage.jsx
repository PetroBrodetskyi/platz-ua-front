import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import LoginForm from '../../components/Auth/LoginForm/LoginForm';
import RegisterForm from '../../components/Auth/RegisterForm/RegisterForm';

const AuthPage = () => {
    const location = useLocation();
    const { id } = useParams();
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const message = params.get('message');
        if (message) {
            setMessage(decodeURIComponent(message));
        }
    }, [location]);

    return (
        <div>
            {message && <div className="message">{message}</div>}
            {id === 'login' ? <LoginForm /> : <RegisterForm />}
        </div>
    );
};

export default AuthPage;
