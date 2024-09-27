import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { FaRegCopy, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FiShare2 } from "react-icons/fi";
import { FaSquareFacebook } from "react-icons/fa6";
import { SiGmail, SiViber } from "react-icons/si"; 
import { GrMailOption } from "react-icons/gr";
import { PiMessengerLogoBold, PiTelegramLogoFill } from "react-icons/pi";
import { BiMessageSquareDetail } from "react-icons/bi";
import scss from './ShareModal.module.scss';

const ShareModal = ({ show, onToggle, productName, productUrl, metaDescription, metaImage }) => {
  const handleOverlayClick = (event) => {
    if (event.target.classList.contains(scss.modalOverlay)) {
      onToggle();
    }
  };

  const handleShare = (platform) => {
    const encodedUrl = encodeURIComponent(productUrl);
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'messenger':
        shareUrl = `fb-messenger://share?link=${encodedUrl}`;
        break;
      case 'instagram':
        shareUrl = `https://www.instagram.com/direct/new/?text=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?url=${encodedUrl}`;
        break;
      case 'gmail':
        shareUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(metaDescription)}&body=${encodedUrl}&imageurl=${encodeURIComponent(metaImage)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(metaDescription)}&body=${encodedUrl}`;
        break;
      case 'sms':
        shareUrl = `sms:?&body=${encodedUrl}`;
        break;
      case 'viber':
        shareUrl = `viber://forward?text=${encodedUrl}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(metaDescription)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(metaDescription)}%0A${encodedUrl}`;
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
            <h2>Поділитися продуктом: {productName}</h2>
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
  );
};

export default ShareModal;
