import React from 'react';

const GalleryItem = ({ src, alt, onClick }) => {
  return (
    <div className="gallery-item">
      <img src={src} alt={alt} onClick={onClick} />
    </div>
  );
};

export default GalleryItem;
