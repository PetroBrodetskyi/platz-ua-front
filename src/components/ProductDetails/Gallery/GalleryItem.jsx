import scss from './Gallery.module.scss';

const GalleryItem = ({ src, alt, onClick }) => {
  return (
    <div className={scss.galleryItem}>
      <img src={src} alt={alt} onClick={onClick} />
    </div>
  );
};

export default GalleryItem;
