import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { FaRegCopy, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FaSquareFacebook } from "react-icons/fa6";
import { SiGmail, SiViber } from "react-icons/si"; 
import { GrMailOption } from "react-icons/gr";
import { PiMessengerLogoBold, PiTelegramLogoFill } from "react-icons/pi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { Helmet } from "react-helmet";
import scss from './ShareModal.module.scss';

const ShareModal = ({ show, onToggle, name, productUrl, price, city, image, metaImage }) => {
  
  const handleOverlayClick = (event) => {
    if (event.target.classList.contains(scss.modalOverlay)) {
      onToggle();
    }
  };

  const handleShare = (platform) => {
    const encodedUrl = encodeURIComponent(productUrl);
    const encodedName = encodeURIComponent(name);
    const encodedPrice = encodeURIComponent(price);
    const encodedLocation = encodeURIComponent(city);
    const encodedImage = encodeURIComponent(image);
    const encodedMetaImage = encodeURIComponent(metaImage);
    const message = `${encodedName}\nЦіна: ${encodedPrice}\nЛокація: ${encodedLocation}\nДеталі: ${encodedUrl} ${encodedImage}`;

    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${message}`;
        break;
      case 'messenger':
        shareUrl = `fb-messenger://share?link=${encodedUrl}&quote=${message}`;
        break;
      case 'instagram':
        shareUrl = `https://www.instagram.com/direct/new/?text=${message}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?url=${encodedUrl}&title=${encodedName}&summary=${message}&source=PlatzUA`;
        break;
      case 'gmail':
        shareUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodedName}&body=${message}&imageurl=${encodedMetaImage}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodedName}&body=${message}`;
        break;
      case 'sms':
        shareUrl = `sms:?&body=${message}`;
        break;
      case 'viber':
        shareUrl = `viber://forward?text=${message}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${message}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${message}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(productUrl).then(() => {
          alert("Посилання скопійовано!");
        }).catch(err => {
          console.error('Помилка копіювання посилання', err);
        });
        return;
      default:
        return;
    }

    window.open(shareUrl, '_blank');
  };

  return (
    <>
      {/* Додавання мета-тегів */}
      <Helmet>
        {/* Open Graph for Facebook, Messenger, LinkedIn, Instagram */}
        <meta property="og:title" content={name} />
        <meta property="og:description" content={`Ціна: ${price}, Локація: ${city}`} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={productUrl} />
        <meta property="og:type" content="product" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={name} />
        <meta name="twitter:description" content={`Ціна: ${price}, Локація: ${city}`} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:url" content={productUrl} />
      </Helmet>

      <AnimatePresence>
        {show && (
          <motion.div
            className={scss.modalOverlay}
            onClick={handleOverlayClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={scss.modalContent}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <div className={scss.closeButton} onClick={onToggle}>
                <FiX />
              </div>
              <h2>Поділитися продуктом: {name}</h2>
              <p>Використовуйте наступні посилання для спільного використання:</p>
              <ul>
                <li>
                  <button onClick={() => handleShare('facebook')}>
                    <FaSquareFacebook /> Facebook
                  </button>
                </li>
                <li>
                  <button onClick={() => handleShare('messenger')}>
                    <PiMessengerLogoBold /> Messenger
                  </button>
                </li>
                <li>
                  <button onClick={() => handleShare('instagram')}>
                    <FaInstagram /> Instagram
                  </button>
                </li>
                <li>
                  <button onClick={() => handleShare('linkedin')}>
                    <FaLinkedin /> LinkedIn
                  </button>
                </li>
                <li>
                  <button onClick={() => handleShare('gmail')}>
                    <SiGmail /> Gmail
                  </button>
                </li>
                <li>
                  <button onClick={() => handleShare('email')}>
                    <GrMailOption /> Email
                  </button>
                </li>
                <li>
                  <button onClick={() => handleShare('sms')}>
                    <BiMessageSquareDetail /> SMS
                  </button>
                </li>
                <li>
                  <button onClick={() => handleShare('viber')}>
                    <SiViber /> Viber
                  </button>
                </li>
                <li>
                  <button onClick={() => handleShare('telegram')}>
                    <PiTelegramLogoFill /> Telegram
                  </button>
                </li>
                <li>
                  <button onClick={() => handleShare('whatsapp')}>
                    <FaWhatsapp /> WhatsApp
                  </button>
                </li>
                <li>
                  <button onClick={() => handleShare('copy')}>
                    <FaRegCopy /> Копіювати
                  </button>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ShareModal;
