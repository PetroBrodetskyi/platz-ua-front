import { MdOutlinePhotoLibrary } from "react-icons/md";
import scss from './ImageButton.module.scss';

const ImageButton = ({ id, register }) => {
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
      <button
        type="button"
        className={scss.customButton}
        onClick={handleClick}
      >
        <MdOutlinePhotoLibrary className={scss.icon} />
      </button>
    </div>
  );
};

export default ImageButton;