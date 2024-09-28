import ImageButton from "../ImageButton/ImageButton";
import scss from "./ImageUploader.module.scss";

const ImageUploader = ({ register, watch }) => (
  <div className={scss.imageContainer}>
    <ImageButton id="image1" register={register} watch={watch} />
    <ImageButton id="image2" register={register} watch={watch} />
    <ImageButton id="image3" register={register} watch={watch} />
    <ImageButton id="image4" register={register} watch={watch} />
  </div>
);

export default ImageUploader;
