import { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { GrZoomOut } from 'react-icons/gr';
import { GrZoomIn } from 'react-icons/gr';
import { useSwipeable } from 'react-swipeable';
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
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setSelectedImage(imageList[currentIndex]);
  }, [currentIndex, imageList]);

  const handleImageClick = () => {
    toggleZoom();
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imageList.length) % imageList.length
    );
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    if (!isZoomed) {
      setZoomLevel(1); // reset zoom level on open
    }
  };

  const increaseZoom = (e) => {
    e.stopPropagation();
    setZoomLevel((prevLevel) => Math.min(prevLevel + 0.5, 2)); // max zoom level of 2
  };

  const decreaseZoom = (e) => {
    e.stopPropagation();
    setZoomLevel((prevLevel) => Math.max(prevLevel - 0.5, 1)); // min zoom level of 1
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && isZoomed) {
      toggleZoom();
    }
    if (event.key === 'ArrowRight') {
      nextImage();
    }
    if (event.key === 'ArrowLeft') {
      prevImage();
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

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => nextImage(),
    onSwipedRight: () => prevImage()
  });

  if (imageList.length === 0) {
    return <p>No images available</p>;
  }

  return (
    <div className={scss.gallery} {...swipeHandlers}>
      <div className={scss.mainImageContainer} onClick={handleImageClick}>
        <img
          src={selectedImage}
          alt="Selected Product"
          className={scss.mainImage}
        />
        <div className={scss.navigationButtons}>
          <button
            className={scss.prevButton}
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            &#9664;
          </button>
          <button
            className={scss.nextButton}
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
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
            className={scss.zoomedImage}
            style={{ transform: `scale(${zoomLevel})` }}
            onClick={(e) => e.stopPropagation()}
          />
          <div className={scss.controls}>
            <GrZoomIn className={scss.zoomInIcon} onClick={increaseZoom} />
            <GrZoomOut className={scss.zoomOutIcon} onClick={decreaseZoom} />
            <AiOutlineClose className={scss.closeIcon} onClick={toggleZoom} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
