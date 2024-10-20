import React from 'react';
import scss from './AdditionalInfo.module.scss';

const AdditionalInfo = ({ formData, handleChange }) => {
  return (
    <div className={scss.additionalInfo}>
      <div className={scss.formGroup}>
        <label htmlFor="plz"></label>
        <input
          type="text"
          id="plz"
          name="plz"
          placeholder="Введіть індекс"
          value={formData.plz}
          onChange={handleChange}
        />
      </div>
      <div className={scss.formGroup}>
        <label htmlFor="city"></label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Введіть ваше місто"
          value={formData.city}
          onChange={handleChange}
        />
      </div>
      <div className={scss.formGroup}>
        <label htmlFor="facebook"></label>
        <input
          type="url"
          id="facebook"
          name="facebook"
          placeholder="Посилання на Facebook"
          value={formData.facebook}
          onChange={handleChange}
        />
      </div>
      <div className={scss.formGroup}>
        <label htmlFor="instagram"></label>
        <input
          type="url"
          id="instagram"
          name="instagram"
          placeholder="Посилання на Instagram"
          value={formData.instagram}
          onChange={handleChange}
        />
      </div>
      <div className={scss.formGroup}>
        <label htmlFor="linkedin"></label>
        <input
          type="url"
          id="linkedin"
          name="linkedin"
          placeholder="Посилання на LinkedIn"
          value={formData.linkedin}
          onChange={handleChange}
        />
      </div>
      <div className={scss.formGroup}>
        <label htmlFor="telegram"></label>
        <input
          type="text"
          id="telegram"
          name="telegram"
          placeholder="Посилання на Telegram"
          value={formData.telegram}
          onChange={handleChange}
        />
      </div>
      <div className={scss.formGroup}>
        <label htmlFor="site"></label>
        <input
          type="text"
          id="site"
          name="site"
          placeholder="Посилання на ваш сайт"
          value={formData.site}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default AdditionalInfo;
