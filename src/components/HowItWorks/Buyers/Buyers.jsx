import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import scss from './Buyers.module.scss';
import pieImage from '/src/assets/images/pie.jpg';
import womenImage from '/src/assets/images/women.jpg';
import childImage from '/src/assets/images/child.jpg';
import grandImage from '/src/assets/images/grand.jpg';
import { FaSearch, FaInfoCircle, FaPhone, FaGift } from 'react-icons/fa';
import { IoSearchSharp } from "react-icons/io5";
import { ButtonBase } from '@mui/material';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Buyers = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleButtonClick = () => {
    navigate('/');
  };

  return (
    <div className={scss.tabContent}>
      <div className={scss.grid}>
        <div className={scss.item} data-aos="fade-left">
          <img src={pieImage} alt="Search for products" className={scss.image} />
                  <div className={scss.info}>
                      <div className={scss.iconTitle}>
                        <FaSearch className={scss.icon} />
                          <p className={scss.title}> Шукайте все, що потрібно</p>
                        </div>
            <p className={scss.text}>Завітайте на головну сторінку, щоб розпочати пошук потрібного товару, або перегляньте доступні категорії для вибору цікавих вам продуктів. Вибирайте серед безлічі варіантів, щоб знайти те, що найкраще відповідає вашим потребам.</p>
          </div>
        </div>
        <div className={scss.item} data-aos="fade-right">
                  <div className={scss.info}>
                      <div className={scss.iconTitle}>
                      <FaInfoCircle className={scss.icon} />
                          <p className={scss.title}> Знайдіть те, що шукаєте</p>
                          </div>
            <p className={scss.text}>Ознайомтеся з фотографіями, детальним описом товару та інформацією про продавця, щоб зробити обґрунтований вибір. Ознайомтеся з відгуками та рейтингами, щоб зробити свій вибір!</p>
          </div>
          <img src={womenImage} alt="Find the right product" className={scss.image} />
        </div>
        <div className={scss.item} data-aos="fade-left">
          <img src={childImage} alt="Contact the seller" className={scss.image} />
                  <div className={scss.info}>
                      <div className={scss.iconTitle}>
                          <FaPhone className={scss.icon} />
                          <p className={scss.title}> Зв'яжіться з продавцем</p>
                      </div>
            <p className={scss.text}>Зателефонуйте продавцю або надішліть повідомлення через чат PlatzUA, щоб отримати додаткову інформацію про товар. Ви можете обговорити деталі, задати питання та узгодити ціну безпосередньо з продавцем. Це простий спосіб отримати більше інформації і зробити покупку, яка вас задовольнить.</p>
          </div>
        </div>
        <div className={scss.item} data-aos="fade-right">
                  <div className={scss.info}>
                      <div className={scss.iconTitle}>
                      <FaGift className={scss.icon} />
                          <p className={scss.title}> Купіть та отримайте ваш товар!</p>
                          </div>
            <p className={scss.text}>Оформіть покупку та виберіть зручний спосіб доставки: скористайтеся послугами пошти або домовтеся з продавцем про особисту зустріч у безпечному громадському місці. Переконайтеся, що всі деталі узгоджені, щоб процес покупки пройшов без проблем і ви швидко отримали ваш товар.</p>
          </div>
          <img src={grandImage} alt="Purchase and receive" className={scss.image} />
        </div>
      </div>
      <div className={scss.buttonWrapper}>
        <p>Почати</p>
        <ButtonBase 
          className={scss.searchButton} 
          onClick={handleButtonClick}
          focusRipple
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={scss.motionWrapper}
          >
            <IoSearchSharp className={scss.iconSearch} />
          </motion.div>
              </ButtonBase>
              <p>пошук</p>
      </div>
    </div>
  );
};

export default Buyers;
