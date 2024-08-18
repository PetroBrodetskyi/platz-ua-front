import { useNavigate } from 'react-router-dom';
import scss from './Sellers.module.scss';
import manshopping from '/src/assets/images/manshopping.png';
import shopping from '/src/assets/images/shopping.png';
import womantalking from '/src/assets/images/womantalking.png';
import creditcard from '/src/assets/images/creditcard.png';
import { FaCamera, FaBullhorn, FaComments, FaTruck } from 'react-icons/fa';
import { IoSearchSharp } from 'react-icons/io5';
import { ButtonBase } from '@mui/material';
import { motion } from 'framer-motion';

const Sellers = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };

  return (
    <div className={scss.tabContent}>
      <ul className={scss.list}>
        <motion.li
          className={scss.item}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src={manshopping}
            alt="Make product photos"
            className={scss.image}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className={scss.info}>
            <div className={scss.iconTitle}>
              <FaCamera className={scss.icon} />
              <p className={scss.title}>Зробіть кілька фото товару</p>
            </div>
            <p className={scss.text}>
              Чому важливо додавати фото, та як це допоможе продати ваш товар швидше? Якісні зображення привертають більше уваги покупців і підвищують довіру до продавця. Завдяки детальним фото ви зможете показати всі переваги вашого товару та відповісти на можливі запитання ще до того, як вони виникнуть у покупців.
            </p>
          </div>
        </motion.li>
        <motion.li
          className={scss.item}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className={scss.info}>
            <div className={scss.iconTitle}>
              <FaBullhorn className={scss.icon} />
              <p className={scss.title}>Опублікуйте ваше оголошення</p>
            </div>
            <p className={scss.text}>
              Додайте детальний опис та розмістіть оголошення. Дочекайтеся відгуків від зацікавлених покупців. Щоб пришвидшити продаж, ви можете використовувати рекламні інструменти, щоб більше людей дізналося про ваш товар. Відповідайте на запити покупців оперативно, і не забувайте оновлювати інформацію, якщо з’являться зміни.
            </p>
          </div>
          <motion.img
            src={shopping}
            alt="Publish your listing"
            className={scss.image}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.li>
        <motion.li
          className={scss.item}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src={womantalking}
            alt="Communicate with buyers"
            className={scss.image}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className={scss.info}>
            <div className={scss.iconTitle}>
              <FaComments className={scss.icon} />
              <p className={scss.title}>Спілкуйтеся з покупцями</p>
            </div>
            <p className={scss.text}>
              Відповідайте на запитання покупців оперативно, надавайте їм докладну інформацію про товар і будьте готові до обговорення ціни. Не соромтеся обговорювати всі деталі, щоб забезпечити взаємне задоволення від покупки. Так ви швидко знайдете зацікавленого покупця.
            </p>
          </div>
        </motion.li>
        <motion.li
          className={scss.item}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className={scss.info}>
            <div className={scss.iconTitle}>
              <FaTruck className={scss.icon} />
              <p className={scss.title}>Продавайте ваш товар!</p>
            </div>
            <p className={scss.text}>
              Використовуйте послуги пошти для зручної та безпечної доставки товару покупцю, або узгодьте зручне місце та час для особистої зустрічі. Пропонуючи різні варіанти доставки, ви підвищуєте шанси на швидкий продаж і робите процес покупки більш комфортним для покупців.
            </p>
          </div>
          <motion.img
            src={creditcard}
            alt="Sell your product"
            className={scss.image}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.li>
      </ul>
      <div className={scss.buttonWrapper}>
        <ButtonBase 
          className={scss.searchButton} 
          onClick={handleButtonClick}
          focusRipple
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className={scss.motionWrapper}
          >
            <IoSearchSharp className={scss.iconSearch} />
          </motion.div>
        </ButtonBase>
      </div>
    </div>
  );
};

export default Sellers;
