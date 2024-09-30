import { useState, useEffect } from 'react';
import { MdOutlinePhotoLibrary } from 'react-icons/md';
import scss from './ImageButton.module.scss';

const ImageButton = ({ id, register, watch }) => {
  const [preview, setPreview] = useState(null);
  const selectedFile = watch(id);

  useEffect(() => {
    if (selectedFile && selectedFile.length > 0) {
      const file = selectedFile[0];
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);

      return () => URL.revokeObjectURL(imageUrl);
    } else {
      setPreview(null);
    }
  }, [selectedFile]);

  const handleClick = () => {
    document.getElementById(id).click();
  };

  return (
    <div className={scss.imagesGroup}>
      <label htmlFor={id}></label>
      <input
        id={id}
        type="file"
        {...register(id)}
        className={scss.hiddenInput}
      />
      <button type="button" className={scss.customButton} onClick={handleClick}>
        {preview ? (
          <img src={preview} alt="Selected" className={scss.previewImage} />
        ) : (
          <MdOutlinePhotoLibrary className={scss.icon} />
        )}
      </button>
    </div>
  );
};

export default ImageButton;
