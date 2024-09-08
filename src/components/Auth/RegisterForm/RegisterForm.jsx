import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { RiEyeCloseLine } from "react-icons/ri";
import { HiOutlineEye } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { register as registerUser } from '../../../redux/features/authSlice.js';
import scss from './RegisterForm.module.scss';
import SubmitButton from '../../SubmitButton/SubmitButton';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import '../RegisterForm/register.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [phone, setPhone] = useState('');
    const [phoneValid, setPhoneValid] = useState(true);
    const [phoneTouched, setPhoneTouched] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector(state => state.auth);

    const passwordVisibility = () => setShowPassword(!showPassword);

    const onSubmit = async (data) => {
        if (!phoneValid) {
            return;
        }
        try {
            await dispatch(registerUser(data)).unwrap();
            navigate('/');
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const handlePhoneChange = (value) => {
        setPhone(value);
        setValue('phone', value, { shouldValidate: true });
        setPhoneTouched(true);
    };

    useEffect(() => {
        setPhoneValid(validatePhoneNumber(phone));
    }, [phone]);

    const validatePhoneNumber = (value) => {
        if (typeof value !== 'string' || !value.trim()) {
            return false;
        }
        const phoneNumber = parsePhoneNumberFromString(value, 'UA');
        return phoneNumber && phoneNumber.isValid();
    };

    return (
        <section className={scss.auth}>
            <div className={scss.form}>
                <div>
                    <ul className={scss.authNav}>
                        <li>
                            <NavLink className={scss.classNavLink} to="/register">Реєстрація</NavLink>
                        </li>
                        <li>
                            <NavLink className={scss.classNavLink} to="/login">Вхід</NavLink>
                        </li>
                    </ul>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className={scss.authForm}>
                    <div>
                        <input
                            {...register('name', { required: 'Ім\'я є обов\'язковим' })}
                            type="text"
                            placeholder="Введіть ваше ім'я"
                        />
                        {errors.name && <p>{errors.name.message}</p>}
                    </div>

                    <div className={scss.phoneInputContainer}>
                        <PhoneInput
                            placeholder="Введіть ваш номер телефону"
                            value={phone}
                            onChange={handlePhoneChange}
                            defaultCountry="DE"
                            international
                            class={phoneValid ? "valid" : "invalid"}
                            onBlur={() => setPhoneTouched(true)}
                        />
                        {!phoneValid && phoneTouched && errors.email && <p>{errors.email.message}</p>}
                    </div>

                    <div>
                        <input
                            {...register('email', { required: 'Email є обов\'язковим', pattern: { value: /^\S+@\S+$/i, message: 'Невірний формат email адреси' } })}
                            type="text"
                            placeholder="Введіть ваш email"
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>

                    <div className={scss.inputWrapper}>
                        <input
                            {...register('password', { required: 'Пароль є обов\'язковим', minLength: { value: 8, message: 'Пароль повинен містити щонайменше 8 символів' } })}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Введіть ваш пароль"
                        />
                        <button type="button" className={scss.eye} onClick={passwordVisibility}>
                            {showPassword ? <HiOutlineEye color="grey" /> : <RiEyeCloseLine color="grey" />}
                        </button>
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>

                    <div className={scss.buttonWrapper}>
                        <SubmitButton buttonText="Реєстрація" onSubmit={handleSubmit(onSubmit)} disabled={loading} />
                    </div>
                    {error && <p className={scss.error}>{error}</p>}
                </form>
            </div>
        </section>
    );
};

export default RegisterForm;
