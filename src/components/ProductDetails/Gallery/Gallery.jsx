import React, { useState, useEffect } from 'react';
import GalleryItem from './GalleryItem.jsx';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import scss from './Gallery.module.scss';

const Gallery = ({ images }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (index) => {
    setSelectedImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
  };

  const handleZoomClick = (index) => {
    setSelectedImage(index);
    setLightboxOpen(true);
  };

  const imageList = [
    images.image1,
    images.image2,
    images.image3,
    images.image4
  ].filter(image => image);

  const isFirstImage = selectedImage === 0;
  const isLastImage = selectedImage === imageList.length - 1;

  const nextImage = () => {
    if (selectedImage < imageList.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  const prevImage = () => {
    if (selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const handlePrevClick = (event) => {
    event.stopPropagation();
    prevImage();
  };

  const handleNextClick = (event) => {
    event.stopPropagation();
    nextImage();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      closeLightbox();
    } else if (event.key === 'ArrowLeft' && !isFirstImage) {
      prevImage();
    } else if (event.key === 'ArrowRight' && !isLastImage) {
      nextImage();
    }
  };

  useEffect(() => {
    if (lightboxOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen, selectedImage]);

  if (imageList.length === 0) {
    return <p>No images available</p>;
  }

  return (
    <div className={scss.galleryContainer}>
      {imageList.map((image, index) => (
        <GalleryItem
          key={index}
          src={image}
          alt={`Product Image ${index + 1}`}
          onClick={() => openLightbox(index)}
          onZoomClick={() => handleZoomClick(index)}
        />
      ))}
      
      {lightboxOpen && (
        <div className={scss.lightBox} onClick={closeLightbox}>
          {!isFirstImage && <BsChevronLeft className={scss.leftArrow} onClick={handlePrevClick} />}
          <img src={imageList[selectedImage]} alt={`Product Image ${selectedImage + 1}`} />
          {!isLastImage && <BsChevronRight className={scss.rightArrow} onClick={handleNextClick} />}
        </div>
      )}
    </div>
  );
};

export default Gallery;
