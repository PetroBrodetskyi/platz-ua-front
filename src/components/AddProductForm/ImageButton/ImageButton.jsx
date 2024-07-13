import React, { useState } from 'react';
import { HiPlus } from 'react-icons/hi2';
import scss from './ImageButton.module.scss';

const ImageButton = ({ id, register }) => {
  const [preview, setPreview] = useState(null);

  const handleClick = () => {
    document.getElementById(id).click();
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={scss.formGroup}>
      <label htmlFor={id}></label>
      <input
        id={id}
        type="file"
        {...register(id)}
        className={scss.hiddenInput}
        onChange={handleChange}
      />
      <button
        type="button"
        className={scss.customButton}
        onClick={handleClick}
      >
        {preview ? (
          <img src={preview} alt="Preview" className={scss.previewImage} />
        ) : (
          <HiPlus />
        )}
      </button>
    </div>
  );
};

export default ImageButton;
