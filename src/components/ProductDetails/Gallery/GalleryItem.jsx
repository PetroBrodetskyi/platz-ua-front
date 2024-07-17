import React from 'react';
import { PiArrowsOutSimple } from "react-icons/pi";
import scss from './Gallery.module.scss';

const GalleryItem = ({ src, alt, onClick, onZoomClick }) => {
  return (
    <div className={scss.galleryItem}>
      <img src={src} alt={alt} onClick={onClick} />
      <div className={scss.zoomIcon} onClick={onZoomClick}>
        <PiArrowsOutSimple />
      </div>
    </div>
  );
};

export default GalleryItem;
