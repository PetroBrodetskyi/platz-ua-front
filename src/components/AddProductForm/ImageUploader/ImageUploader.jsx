import ImageButton from '../ImageButton/ImageButton';
import scss from './ImageUploader.module.scss';

const ImageUploader = ({ register, watch, isDarkMode }) => (
  <div className={scss.imageContainer}>
    <ImageButton
      id="image1"
      register={register}
      watch={watch}
      isDarkMode={isDarkMode}
    />
    <ImageButton
      id="image2"
      register={register}
      watch={watch}
      isDarkMode={isDarkMode}
    />
    <ImageButton
      id="image3"
      register={register}
      watch={watch}
      isDarkMode={isDarkMode}
    />
    <ImageButton
      id="image4"
      register={register}
      watch={watch}
      isDarkMode={isDarkMode}
    />
  </div>
);

export default ImageUploader;
