import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import scss from './UserProfile.module.scss';

const UserProfile = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    avatarURL: '',
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        avatarURL: user.avatarURL || '',
      });
      setPreview(user.avatarURL || null);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setFormData({ ...formData, avatarURL: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const handleAvatarClick = () => {
    document.getElementById('avatarInput').click();
  };

  return (
    <div className={scss.container}>
      <div className={scss.userProfile}>
        <h4>Ваші данні</h4>
        <div className={scss.avatarContainer}>
          <div className={scss.avatarInput}>
            <img
              src={preview}
              alt={formData.name}
              className={scss.avatar}
              onClick={handleAvatarClick}
            />
            <input
              id="avatarInput"
              type="file"
              onChange={handleFileChange}
              className={scss.fileInput}
              />
            </div>
          <AiOutlinePlus
            className={scss.plusIcon}
            onClick={handleAvatarClick}
          />
        </div>
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
          <button type="submit">Зберегти зміни</button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
