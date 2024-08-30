import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import scss from './UserProfile.module.scss';
import Loader from '../Loader/Loader';

const UserProfile = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    avatarURL: '',
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        avatarURL: user.avatarURL || '',
      });
      setPreview(user.avatarURL || null);
      setLoading(false);
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
      setFormData({ ...formData, avatar: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('email', formData.email);
    if (formData.avatar) {
      formDataToSend.append('avatar', formData.avatar);
    }
    try {
      await onUpdate(formDataToSend);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleAvatarClick = () => {
    document.getElementById('avatarInput').click();
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  if (loading) {
    return <Loader />;
  }

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
