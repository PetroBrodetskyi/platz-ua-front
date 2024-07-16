import React from 'react';
import { GrZoomIn } from "react-icons/gr";
import scss from './Gallery.module.scss';

const GalleryItem = ({ src, alt, onClick, onZoomClick }) => {
  return (
    <div className={scss.galleryItem}>
      <img src={src} alt={alt} onClick={onClick} />
      <div className={scss.zoomIcon} onClick={onZoomClick}>
        <GrZoomIn />
      </div>
    </div>
  );
};

export default GalleryItem;
