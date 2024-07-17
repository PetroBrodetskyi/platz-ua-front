import React, { useState } from 'react';
import { FaRegCopy, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FiShare2 } from "react-icons/fi";
import { FaSquareFacebook } from "react-icons/fa6";
import { SiGmail, SiViber } from "react-icons/si"; 
import { GrMailOption } from "react-icons/gr";
import { PiMessengerLogoBold, PiTelegramLogoFill } from "react-icons/pi";
import { BiMessageSquareDetail } from "react-icons/bi";
import scss from './ShareMenu.module.scss';

const ShareMenu = ({ productUrl }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(productUrl).then(() => {
      alert('Посилання скопійовано');
    }).catch(err => {
      console.error('Помилка копіювання посилання', err);
    });
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
        shareUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=Перегляньте цей продукт&body=${encodedUrl}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=Перегляньте цей продукт&body=${encodedUrl}`;
        break;
      case 'sms':
        shareUrl = `sms:?&body=${encodedUrl}`;
        break;
      case 'viber':
        shareUrl = `viber://forward?text=${encodedUrl}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodedUrl}`;
        break;
      case 'copy':
        handleCopyLink();
        return;
      default:
        return;
    }

    window.open(shareUrl, '_blank');
  };

  const toggleShareMenu = () => {
    setShowShareMenu(!showShareMenu);
  };

  return (
    <div className={scss.shareContainer}>
      <button onClick={toggleShareMenu} className={scss.shareButton}>
        <FiShare2 className={scss.icon} /> 
      </button>
      {showShareMenu && (
        <div className={scss.shareLinks}>
                  <button
                      className={scss.face}
                      onClick={() => handleShare('facebook')}>
                      <FaSquareFacebook className={scss.icon} />
                  </button >
                  <button
                      className={scss.mess}
                      onClick={() => handleShare('messenger')}>
                      <PiMessengerLogoBold className={scss.icon} />
                  </button>
                  <button className={scss.inst}
                      onClick={() => handleShare('instagram')}>
                      <FaInstagram className={scss.icon} />
                  </button>
                  <button
                      className={scss.link}
                      onClick={() => handleShare('linkedin')}>
                      <FaLinkedin className={scss.icon} />
                  </button>
                  <button className={scss.gmai}
                      onClick={() => handleShare('gmail')}>
                      <SiGmail className={scss.icon} />
                  </button>
                  <button className={scss.emai}
                      onClick={() => handleShare('email')}>
                      <GrMailOption className={scss.icon} />
                  </button>
                  <button className={scss.smss}
                      onClick={() => handleShare('sms')}>
                      <BiMessageSquareDetail className={scss.icon} />
                  </button>
                  <button className={scss.vibe}
                      onClick={() => handleShare('viber')}>
                      <SiViber className={scss.icon} />
                  </button>
                  <button className={scss.tele}
                      onClick={() => handleShare('telegram')}>
                      <PiTelegramLogoFill className={scss.icon} />
                  </button>
                  <button className={scss.what}
                      onClick={() => handleShare('whatsapp')}>
                      <FaWhatsapp className={scss.icon} />
                  </button>
                  <button className={scss.copy}
                      onClick={() => handleShare('copy')}>
                      <FaRegCopy className={scss.icon} />
                  </button>
        </div>
      )}
    </div>
  );
};

export default ShareMenu;
