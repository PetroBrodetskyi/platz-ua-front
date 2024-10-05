import { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useSwipeable } from 'react-swipeable';
import scss from './GalleryCard.module.scss';

const GalleryCard = ({ images, viewMode }) => {
  const imageList = [
    images.image1,
    images.image2,
    images.image3,
    images.image4
  ].filter((image) => image);

  const [selectedImage, setSelectedImage] = useState(imageList[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0);

  const handleImageClick = () => {
    toggleZoom();
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
    onSwipedLeft: () => {
      setSelectedImage((prev) => {
        const currentIndex = imageList.indexOf(prev);
        const nextIndex = (currentIndex + 1) % imageList.length;
        return imageList[nextIndex];
      });
    },
    onSwipedRight: () => {
      setSelectedImage((prev) => {
        const currentIndex = imageList.indexOf(prev);
        const prevIndex =
          (currentIndex - 1 + imageList.length) % imageList.length;
        return imageList[prevIndex];
      });
    }
  });

  if (imageList.length === 0) {
    return <p>No images available</p>;
  }

  return (
    <div className={scss.gallery} {...swipeHandlers}>
      <div
        className={`${scss.productImage} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`}
        onClick={handleImageClick}
      >
        <img
          src={selectedImage}
          alt="Selected Product"
          className={scss.image}
        />
      </div>
      <div className={scss.thumbnailContainer}>
        {imageList.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Product thumbnail ${index + 1}`}
            className={`${scss.thumbnail} ${selectedImage === image ? scss.selectedThumbnail : ''}`}
            onClick={() => setSelectedImage(image)}
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

export default GalleryCard;
