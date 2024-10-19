import { useState } from 'react';
import { RiEyeCloseLine } from 'react-icons/ri';
import { HiOutlineEye } from 'react-icons/hi';
import scss from './UserInfo.module.scss';

const UserInfo = ({ formData, handleChange, hasPassword }) => {
  const [showpassword, setShowpassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowpassword = () => {
    setShowpassword((prev) => !prev);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword((prev) => !prev);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className={scss.group}>
      <div className={scss.personalInfo}>
        <div className={scss.formGroup}>
          <label htmlFor="name">Ім'я:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!hasPassword}
          />
        </div>
        <div className={scss.formGroup}>
          <label htmlFor="phone">Телефон:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Номер телефону"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className={scss.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!hasPassword}
          />
        </div>
        <div className={scss.formGroup}>
          <label htmlFor="password">Старий пароль:</label>
          <div className={scss.inputWrapper}>
            <input
              type={showpassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Введіть поточний пароль"
              value={formData.password}
              onChange={handleChange}
              disabled={!hasPassword}
            />
            <button
              type="button"
              className={scss.eye}
              onClick={toggleShowpassword}
            >
              {showpassword ? (
                <HiOutlineEye color="grey" />
              ) : (
                <RiEyeCloseLine color="grey" />
              )}
            </button>
          </div>
        </div>
        <div className={scss.formGroup}>
          <label htmlFor="newPassword">Новий пароль:</label>
          <div className={scss.inputWrapper}>
            <input
              type={showNewPassword ? 'text' : 'password'}
              id="newPassword"
              name="newPassword"
              placeholder="Введіть новий пароль"
              value={formData.newPassword}
              onChange={handleChange}
              disabled={!hasPassword}
            />
            <button
              type="button"
              className={scss.eye}
              onClick={toggleShowNewPassword}
            >
              {showNewPassword ? (
                <HiOutlineEye color="grey" />
              ) : (
                <RiEyeCloseLine color="grey" />
              )}
            </button>
          </div>
        </div>
        <div className={scss.formGroup}>
          <label htmlFor="confirmPassword">Підтвердити новий пароль:</label>
          <div className={scss.inputWrapper}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Підтвердження нового пароля"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={!hasPassword}
            />
            <button
              type="button"
              className={scss.eye}
              onClick={toggleShowConfirmPassword}
            >
              {showConfirmPassword ? (
                <HiOutlineEye color="grey" />
              ) : (
                <RiEyeCloseLine color="grey" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
