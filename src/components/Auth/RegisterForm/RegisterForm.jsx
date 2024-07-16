import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { RiEyeCloseLine } from "react-icons/ri";
import { HiOutlineEye } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { register as registerUser } from '../../../redux/features/authSlice.js';
import css from './RegisterForm.module.scss';
import SubmitButton from '../../SubmitButton/SubmitButton';

const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector(state => state.auth);
    
    const phone = watch('phone');

    const passwordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data) => {
        try {
            const result = await dispatch(registerUser(data)).unwrap();
            navigate('/');
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const formatPhoneNumber = (value) => {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, '');
        const phoneNumberLength = phoneNumber.length;

        if (phoneNumberLength < 3) return `+${phoneNumber}`;
        if (phoneNumberLength < 6) return `+${phoneNumber.slice(0, 2)}(${phoneNumber.slice(2)}`;
        if (phoneNumberLength < 9) return `+${phoneNumber.slice(0, 2)}(${phoneNumber.slice(2, 5)})${phoneNumber.slice(5)}`;
        if (phoneNumberLength < 11) return `+${phoneNumber.slice(0, 2)}(${phoneNumber.slice(2, 5)})${phoneNumber.slice(5, 8)}-${phoneNumber.slice(8)}`;
        return `+${phoneNumber.slice(0, 2)}(${phoneNumber.slice(2, 5)})${phoneNumber.slice(5, 8)}-${phoneNumber.slice(8, 10)}-${phoneNumber.slice(10, 12)}`;
    };

    const handlePhoneChange = (event) => {
        const { value } = event.target;
        const formattedPhoneNumber = formatPhoneNumber(value);
        setValue('phone', formattedPhoneNumber, { shouldValidate: true });
    };

    const isValidPhoneNumber = (value) => {
        return /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(value);
    };

    return (
        <section className={css.authPage}>
            <div className={css.form}>
                <div>
                    <ul className={css.authNav}>
                        <li>
                            <NavLink className={css.classNavLink} to="/register">Реєстрація</NavLink>
                        </li>
                        <li>
                            <NavLink className={css.classNavLink} to="/login">Вхід</NavLink>
                        </li>
                    </ul>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className={css.authForm}>
                    <div>
                        <input
                            {...register('name', { required: 'Ім\'я є обов\'язковим' })}
                            type="text"
                            placeholder="Введіть ваше ім'я"
                        />
                        {errors.name && <p>{errors.name.message}</p>}
                    </div>

                    <div>
                        <input
                            {...register('phone', { required: 'Телефон є обов\'язковим', pattern: { value: /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/, message: 'Невірний формат номера телефону' } })}
                            type="text"
                            placeholder="Введіть ваш номер телефону"
                            onChange={handlePhoneChange}
                            className={!phone ? '' : (isValidPhoneNumber(phone) ? css.valid : css.invalid)}
                        />
                    </div>

                    <div>
                        <input
                            {...register('email', { required: 'Email є обов\'язковим', pattern: { value: /^\S+@\S+$/i, message: 'Невірний формат email адреси' } })}
                            type="text"
                            placeholder="Введіть ваш email"
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>

                    <div className={css.inputWrapper}>
                        <input
                            {...register('password', { required: 'Пароль є обов\'язковим', minLength: { value: 8, message: 'Пароль повинен містити щонайменше 8 символів' } })}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Введіть ваш пароль"
                        />
                        <button type="button" className={css.eye} onClick={passwordVisibility}>
                            {showPassword ? <HiOutlineEye color="grey" /> : <RiEyeCloseLine color="grey" />}
                        </button>
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>

                    <div className={css.buttonWrapper}>
                        <SubmitButton buttonText="Реєстрація" onSubmit={handleSubmit(onSubmit)} disabled={loading} />
                    </div>
                    {error && <p className={css.error}>{error}</p>}
                </form>
            </div>
        </section>
    );
};

export default RegisterForm;
