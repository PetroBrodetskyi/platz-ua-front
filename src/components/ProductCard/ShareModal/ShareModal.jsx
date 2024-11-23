import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import ShareButton from '../ShareButton';
import { useTheme } from '../../../context/ThemeContext';
import { useEffect } from 'react';
import scss from './ShareModal.module.scss';

Modal.setAppElement('#root');

const ShareModal = ({
  show,
  description,
  onToggle,
  name,
  productUrl,
  price,
  city,
  image
}) => {
  const maxDescriptionLength = 80;

  const getTrimmedDescription = (desc) =>
    desc && desc.length > maxDescriptionLength
      ? `${desc.slice(0, maxDescriptionLength)}...`
      : desc;

  const trimmedDescription = getTrimmedDescription(description);

  const message = `${name} \nЦіна: ${price} \nЛокація: ${city} ${trimmedDescription} \nДеталі: ${productUrl} ${image}`;

  const sharePlatforms = {
    facebook: (message) =>
      `https://www.facebook.com/sharer/sharer.php?u=${productUrl}&quote=${message}`,
    messenger: (message) =>
      `fb-messenger://share?link=${productUrl}&quote=${message}`,
    instagram: (message) =>
      `https://www.instagram.com/direct/new/?text=${message}`,
    linkedin: (message) =>
      `https://www.linkedin.com/shareArticle?url=${productUrl}&title=${name}&summary=${message}&source=PlatzUA`,
    gmail: (message) =>
      `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${name}&body=${message}&imageurl=${image}`,
    email: () => `mailto:?subject=${name}&body=${message}`,
    sms: (message) => `sms:?&body=${message}`,
    viber: (message) => `viber://forward?text=${message}`,
    telegram: (message) => `https://t.me/share/url?url=${message}`,
    whatsapp: (message) => `https://api.whatsapp.com/send?text=${message}`,
    copy: () => {
      navigator.clipboard
        .writeText(productUrl)
        .then(() => {
          alert('Посилання скопійовано!');
        })
        .catch((err) => {
          console.error('Помилка копіювання посилання', err);
        });
      return;
    }
  };

  const handleShare = (platform) => {
    const shareMessage = `${name} \nЦіна: ${price} \nЛокація: ${city} ${trimmedDescription} \nДеталі: ${productUrl}`;

    const shareUrl = sharePlatforms[platform](shareMessage);

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  useEffect(() => {
    if (show) {
      document.body.classList.add(scss.noScroll);
    } else {
      document.body.classList.remove(scss.noScroll);
    }

    return () => document.body.classList.remove(scss.noScroll);
  }, [show]);

  const { isDarkMode } = useTheme();

  return (
    <>
      <Helmet>
        <meta property="og:title" content={name} />
        <meta
          property="og:description"
          content={description || `Ціна: ${price}, Локація: ${city}`}
        />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={productUrl} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={name} />
        <meta
          name="twitter:description"
          content={description || `Ціна: ${price}, Локація: ${city}`}
        />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:url" content={productUrl} />
      </Helmet>

      <Modal
        isOpen={show}
        onRequestClose={onToggle}
        overlayClassName={scss.modalOverlay}
        className={`${scss.shareModal} ${isDarkMode ? scss.darkMode : ''}`}
        contentLabel="Поділитися"
        shouldCloseOnOverlayClick={true}
      >
        <div className={`${scss.container} ${isDarkMode ? scss.darkMode : ''}`}>
          <div className={scss.header}>
            <h2>{name}</h2>
            <button onClick={onToggle}>
              <FiX className={scss.closeIcon} />
            </button>
          </div>
          <ul className={scss.buttons}>
            {Object.keys(sharePlatforms).map((platform) => (
              <li key={platform}>
                <ShareButton
                  platform={platform}
                  onClick={() => handleShare(platform)}
                />
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default ShareModal;
