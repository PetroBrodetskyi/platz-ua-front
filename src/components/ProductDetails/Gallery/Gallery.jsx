import React, { useState, useEffect } from 'react';
import scss from './Gallery.module.scss';

const Gallery = ({ images }) => {
  const imageList = [
    images.image1,
    images.image2,
    images.image3,
    images.image4
  ].filter(image => image);

  const [selectedImage, setSelectedImage] = useState(imageList[0]);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && isZoomed) {
      setIsZoomed(false);
    }
  };

  useEffect(() => {
    if (isZoomed) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isZoomed]);

  if (imageList.length === 0) {
    return <p>No images available</p>;
  }

  return (
    <div className={scss.galleryContainer}>
      <div className={scss.mainImageContainer} onClick={toggleZoom}>
        <img src={selectedImage} alt="Selected Product" className={scss.mainImage} />
      </div>
      <div className={scss.thumbnailContainer}>
        {imageList.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Product thumbnail ${index + 1}`}
            className={`${scss.thumbnail} ${selectedImage === image ? scss.selectedThumbnail : ''}`}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
      
      {isZoomed && (
        <div className={scss.zoomOverlay} onClick={toggleZoom}>
          <img src={selectedImage} alt="Zoomed Product" className={scss.zoomedImage} />
        </div>
      )}
    </div>
  );
};

export default Gallery;
