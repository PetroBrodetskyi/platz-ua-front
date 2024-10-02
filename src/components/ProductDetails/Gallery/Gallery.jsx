import { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import scss from './Gallery.module.scss';

const Gallery = ({ images }) => {
  const imageList = [
    images.image1,
    images.image2,
    images.image3,
    images.image4
  ].filter((image) => image);

  const [selectedImage, setSelectedImage] = useState(imageList[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setSelectedImage(imageList[currentIndex]);
  }, [currentIndex, imageList]);

  const handleImageClick = () => {
    toggleZoom();
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageList.length - 1 : prevIndex - 1
    );
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    if (!isZoomed) {
      setZoomLevel(0);
    }
  };

  const increaseZoom = (e) => {
    e.stopPropagation();
    if (zoomLevel < 2) {
      setZoomLevel((prevLevel) => prevLevel + 1);
    }
  };

  const decreaseZoom = (e) => {
    e.stopPropagation();
    if (zoomLevel > 0) {
      setZoomLevel((prevLevel) => prevLevel - 1);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && isZoomed) {
      setZoomLevel(0);
      setIsZoomed(false);
    }
    if (event.key === 'ArrowRight') {
      nextImage(event);
    }
    if (event.key === 'ArrowLeft') {
      prevImage(event);
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
    <div className={scss.gallery}>
      <div className={scss.mainImageContainer} onClick={handleImageClick}>
        <img
          src={selectedImage}
          alt="Selected Product"
          className={scss.mainImage}
        />
        <div className={scss.navigationButtons}>
          <button className={scss.prevButton} onClick={prevImage}>
            &#9664;
          </button>
          <button className={scss.nextButton} onClick={nextImage}>
            &#9654;
          </button>
        </div>
      </div>
      <div className={scss.thumbnailContainer}>
        {imageList.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Product thumbnail ${index + 1}`}
            className={`${scss.thumbnail} ${selectedImage === image ? scss.selectedThumbnail : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {isZoomed && (
        <div className={scss.zoomOverlay} onClick={toggleZoom}>
          <img
            src={selectedImage}
            alt="Zoomed Product"
            className={`${scss.zoomedImage} ${zoomLevel === 2 ? scss.zoomedImageFull : ''}`}
            onClick={(e) => e.stopPropagation()}
          />
          <div className={scss.controls}>
            <AiOutlineClose className={scss.closeIcon} onClick={toggleZoom} />
            {zoomLevel < 2 && (
              <AiOutlinePlus
                className={scss.zoomInIcon}
                onClick={increaseZoom}
              />
            )}
            {zoomLevel > 0 && (
              <AiOutlineMinus
                className={scss.zoomOutIcon}
                onClick={decreaseZoom}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
