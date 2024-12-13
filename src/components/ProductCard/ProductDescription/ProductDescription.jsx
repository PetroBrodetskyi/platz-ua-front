import Modal from 'react-modal';
import { TbLocation } from 'react-icons/tb';
import { FiX } from 'react-icons/fi';
import { SlLocationPin } from 'react-icons/sl';
import { useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import scss from './ProductDescription.module.scss';

Modal.setAppElement('#root');

const ProductDescription = ({
  show,
  name,
  description,
  image,
  PLZ,
  city,
  onToggle
}) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onToggle();
    }
  };

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [show]);

  const { isDarkMode } = useTheme();

  return (
    <Modal
      isOpen={show}
      onRequestClose={onToggle}
      overlayClassName={scss.modalOverlay}
      className={`${scss.modal} ${isDarkMode ? scss.darkMode : ''}`}
      contentLabel="Product Description"
      shouldCloseOnOverlayClick={true}
    >
      <div className={`${scss.container} ${isDarkMode ? scss.darkMode : ''}`}>
        <div className={scss.header}>
          <h3 className={scss.title}>{name}</h3>
          <button onClick={onToggle}>
            <FiX className={scss.icon} />
          </button>
        </div>
        <div className={scss.imageDescription}>
          <div className={scss.imageContainer}>
            <img src={image} alt={name} className={scss.image} />
          </div>
          <div className={scss.description}>
            <div>
              <p className={scss.desc}>{description}</p>
            </div>
            <div className={scss.locationContainer}>
              <div className={scss.locationItem}>
                <TbLocation className={scss.icon} />
                <p>{PLZ}</p>
              </div>
              <div className={scss.locationItem}>
                <SlLocationPin className={scss.icon} />
                <p>{city}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDescription;
