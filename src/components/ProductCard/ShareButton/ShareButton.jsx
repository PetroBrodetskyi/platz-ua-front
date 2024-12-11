import { FaRegCopy, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FaSquareFacebook } from 'react-icons/fa6';
import { SiGmail, SiViber } from 'react-icons/si';
import { GrMailOption } from 'react-icons/gr';
import { PiMessengerLogoBold, PiTelegramLogoFill } from 'react-icons/pi';
import { BiMessageSquareDetail } from 'react-icons/bi';
import scss from './ShareButton.module.scss';

const icons = {
  facebook: <FaSquareFacebook className={`${scss.icon} ${scss.facebook}`} />,
  messenger: (
    <PiMessengerLogoBold className={`${scss.icon} ${scss.messenger}`} />
  ),
  instagram: <FaInstagram className={scss.icon} />,
  linkedin: <FaLinkedin className={scss.icon} />,
  gmail: <SiGmail className={scss.icon} />,
  email: <GrMailOption className={scss.icon} />,
  sms: <BiMessageSquareDetail className={scss.icon} />,
  viber: <SiViber className={scss.icon} />,
  telegram: <PiTelegramLogoFill className={scss.icon} />,
  whatsapp: <FaWhatsapp className={scss.icon} />,
  copy: <FaRegCopy className={scss.icon} />
};

const ShareButton = ({ platform, onClick }) => {
  return (
    <div onClick={onClick} className={scss.button}>
      {icons[platform]}
      {platform.charAt(0).toUpperCase() + platform.slice(1)}
    </div>
  );
};

export default ShareButton;
