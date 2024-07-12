import React, { useState } from 'react';
import scss from './UserProfile.module.scss';

const UserProfile = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
    email: user.email,
    avatarURL: user.avatarURL,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatarURL: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className={scss.userProfile}>
      <form onSubmit={handleSubmit}>
        <div className={scss.formGroup}>
          <label htmlFor="name">Ім'я:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className={scss.formGroup}>
          <label htmlFor="phone">Телефон:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
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
          />
        </div>
        <div className={scss.formGroup}>
          <label htmlFor="avatarURL">Аватар:</label>
          <input
            type="file"
            id="avatarURL"
            name="avatarURL"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Зберегти зміни</button>
      </form>
    </div>
  );
};

export default UserProfile;
