import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { RiEyeCloseLine } from "react-icons/ri";
import { HiOutlineEye } from "react-icons/hi";
import css from './LoginForm.module.scss';
import SubmitButton from '../../SubmitButton/SubmitButton';

const LoginForm = () => {
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
                        <SubmitButton buttonText="Логін" onSubmit={handleSubmit(onSubmit)} />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default LoginForm;
