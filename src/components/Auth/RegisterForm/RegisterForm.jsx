import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import css from './RegisterForm.module.scss';
import SubmitButton from '../../SubmitButton/SubmitButton';

const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const passwordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = (data) => {
        console.log(data);
        navigate('/home');
    };

    return (
        <section className={css.authPage}>
            <div className={css.form}>
                <div>
                    <ul className={css.authNav}>
                        <li>
                            <NavLink className={css.classNavLink} to="/auth/register">Registration</NavLink>
                        </li>
                        <li>
                            <NavLink className={css.classNavLink} to="/auth/login">Log In</NavLink>
                        </li>
                    </ul>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className={css.authForm}>
                    <div>
                        <input
                            {...register('username', { required: 'Name is required' })}
                            type="text"
                            placeholder="Enter your name"
                        />
                        {errors.username && <p>{errors.username.message}</p>}
                    </div>

                    <div>
                        <input
                            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                            type="text"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>

                    <div className={css.inputWrapper}>
                        <input
                            {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                        />
                        <button type="button" className={css.eye} onClick={passwordVisibility}>
                            👁️
                        </button>
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>

                    <SubmitButton buttonText="Реєстрація" onSubmit={handleSubmit(onSubmit)} />
                </form>
            </div>
        </section>
    );
};

export default RegisterForm;
