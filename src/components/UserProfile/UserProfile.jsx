import { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import axios from 'axios';
import Loader from '../Loader';
import Notification from '../Notification';
import { useSelector } from 'react-redux';
import AdditionalInfo from './AdditionalInfo';
import UserInfo from './UserInfo';
import scss from './UserProfile.module.scss';

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
  const [hasPassword, setHasPassword] = useState(true);
  const [charCount, setCharCount] = useState(0);
  const token = useSelector((state) => state.auth.token);
  const maxChars = 150;

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
      setCharCount(user.about ? user.about.length : 0);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'about') {
      setCharCount(value.length);
    }
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAvatarClick = () => {
    document.getElementById('avatarInput').click();
  };

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
          <div className={scss.avatarContainer}>
            <div>
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
          <div className={scss.formGroup}>
            <label htmlFor="about">Про мене:</label>
            <textarea
              id="about"
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Напишіть кілька слів про себе"
              className={scss.about}
              maxLength={maxChars}
            />
            <p className={scss.chars}>
              Доступно символів: {maxChars - charCount}
            </p>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className={scss.infoFlex}>
              <UserInfo
                formData={formData}
                handleChange={handleChange}
                hasPassword={hasPassword}
              />

              <AdditionalInfo formData={formData} handleChange={handleChange} />
            </div>
            <button
              type="submit"
              className={scss.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Збереження...' : 'Зберегти зміни'}
            </button>
          </form>
        </div>
      </div>
      {notification && (
        <Notification
          message={notification}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
};

export default UserProfile;
