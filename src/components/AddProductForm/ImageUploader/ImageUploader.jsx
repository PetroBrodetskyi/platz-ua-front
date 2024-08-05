import ImageButton from '../ImageButton/ImageButton';
import scss from './ImageUploader.module.scss';

const ImageUploader = ({ register }) => (
  <div className={scss.imageContainer}>
    <ImageButton id="image1" register={register} />
    <ImageButton id="image2" register={register} />
    <ImageButton id="image3" register={register} />
    <ImageButton id="image4" register={register} />
  </div>
);

export default ImageUploader;
