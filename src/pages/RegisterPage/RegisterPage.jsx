import React from 'react';
import RegisterForm from '../../components/Auth/RegisterForm/RegisterForm';
import ProductList from '../../components/ProductList/ProductList';

const RegisterPage = () => {
    return (
        <div>
            <RegisterForm />
            <ProductList />
        </div>
    );
};

export default RegisterPage;
