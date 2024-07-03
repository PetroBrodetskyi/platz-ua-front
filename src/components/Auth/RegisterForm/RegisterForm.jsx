import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { RiEyeCloseLine } from "react-icons/ri";
import { HiOutlineEye } from "react-icons/hi";
import css from './RegisterForm.module.scss';
import SubmitButton from '../../SubmitButton/SubmitButton';

const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const passwordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result);
            navigate('/home');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <section className={css.authPage}>
            <div className={css.form}>
                <div>
                    <ul className={css.authNav}>
                        <li>
                            <NavLink className={css.classNavLink} to="/auth/register">Реєстрація</NavLink>
                        </li>
                        <li>
                            <NavLink className={css.classNavLink} to="/auth/login">Вхід</NavLink>
                        </li>
                    </ul>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className={css.authForm}>
                    <div>
                        <input
                            {...register('name', { required: 'Name is required' })}
                            type="text"
                            placeholder="Введіть ваше ім'я"
                        />
                        {errors.name && <p>{errors.name.message}</p>}
                    </div>

                    <div>
                        <input
                            {...register('phone', { required: 'Phone is required', pattern: { value: /^\+38\(\d{3}\)\d{3}-\d{2}-\d{2}$/, message: 'Invalid phone number' } })}
                            type="text"
                            placeholder="Введіть ваш телефон"
                        />
                        {errors.phone && <p>{errors.phone.message}</p>}
                    </div>

                    <div>
                        <input
                            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                            type="text"
                            placeholder="Введіть ваш email"
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>

                    <div className={css.inputWrapper}>
                        <input
                            {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Введіть ваш пароль"
                        />
                        <button type="button" className={css.eye} onClick={passwordVisibility}>
                            {showPassword ? <HiOutlineEye color="grey" /> : <RiEyeCloseLine color="grey" />}
                        </button>
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>

                    <div className={css.buttonWrapper}>
                        <SubmitButton buttonText="Реєстрація" onSubmit={handleSubmit(onSubmit)} />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default RegisterForm;
