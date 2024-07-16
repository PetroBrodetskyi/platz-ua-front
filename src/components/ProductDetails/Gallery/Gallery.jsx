import React, { useState, useEffect } from 'react';
import GalleryItem from './GalleryItem.jsx';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import '../Gallery/gallery.css';

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

  const imageKeys = Object.keys(images).filter(key => key.startsWith('image'));
  const isFirstImage = selectedImage === 0;
  const isLastImage = selectedImage === imageKeys.length - 1;

  const nextImage = () => {
    if (selectedImage < imageKeys.length - 1) {
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

  return (
    <div className="gallery-container">
      {imageKeys.map((key, index) => (
        <GalleryItem
          key={index}
          src={images[key]}
          alt={`Product Image ${index + 1}`}
          onClick={() => openLightbox(index)}
        />
      ))}
      
      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          {!isFirstImage && <BsChevronLeft className="left-arrow" onClick={handlePrevClick} />}
          <img src={images[imageKeys[selectedImage]]} alt={`Product Image ${selectedImage + 1}`} />
          {!isLastImage && <BsChevronRight className="right-arrow" onClick={handleNextClick} />}
        </div>
      )}
    </div>
  );
};

export default Gallery;
