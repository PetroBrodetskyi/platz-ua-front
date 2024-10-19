import { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import axios from 'axios';
import { RiEyeCloseLine } from 'react-icons/ri';
import { HiOutlineEye } from 'react-icons/hi';
import scss from './UserProfile.module.scss';
import Loader from '../Loader';
import Notification from '../Notification';
import { useSelector } from 'react-redux';
import AdditionalInfo from './AdditionalInfo';

const UserProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    avatar: null,
    plz: '',
    city: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    telegram: '',
    site: '',
    about: '',
    password: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showpassword, setShowpassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hasPassword, setHasPassword] = useState(true);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        avatar: null,
        plz: user.plz || '',
        city: user.city || '',
        facebook: user.facebook || '',
        instagram: user.instagram || '',
        linkedin: user.linkedin || '',
        telegram: user.telegram || '',
        site: user.site || '',
        about: user.about || '',
        password: '',
        newPassword: '',
        confirmPassword: ''
      });
      setPreview(user.avatarURL || null);
      setHasPassword(user.hasPassword);
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setFormData((prev) => ({ ...prev, avatar: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        formDataToSend.append(key, value);
      }
    });

    if (
      formData.newPassword &&
      formData.newPassword === formData.confirmPassword
    ) {
      formDataToSend.append('password', formData.password);
      formDataToSend.append('newPassword', formData.newPassword);
    }

    try {
      const response = await axios.patch(
        'https://platz-ua-back.vercel.app/api/users/current',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Profile updated:', response.data);
      setNotification('Дані успішно збережено!');
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAvatarClick = () => {
    document.getElementById('avatarInput').click();
  };

  const toggleShowpassword = () => {
    setShowpassword((prev) => !prev);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword((prev) => !prev);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleCloseNotification = () => {
    setNotification(null);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={scss.container}>
      <div className={scss.userProfile}>
        <div>
          <h3>Ваші дані</h3>
          {notification && (
            <Notification
              message={notification}
              onClose={handleCloseNotification}
            />
          )}
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
                accept="image/*"
              />
            </div>
            <AiOutlinePlus
              className={scss.plusIcon}
              onClick={handleAvatarClick}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
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
                <label htmlFor="confirmPassword">
                  Підтвердити новий пароль:
                </label>
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

              <AdditionalInfo formData={formData} handleChange={handleChange} />
            </div>
          </div>

          <button
            type="submit"
            className={scss.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Збереження...' : 'Зберегти зміни'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
