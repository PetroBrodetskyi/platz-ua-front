import { MdOutlineDeleteSweep } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { motion } from "framer-motion";
import scss from './Confirmation.module.scss';

const Confirmation = ({ message, onConfirm, onCancel }) => {
  return (
    <motion.div 
      className={scss.dialogOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className={scss.dialogBox}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <p>{message}</p>
        <div className={scss.dialogButtons}>
          <motion.button 
            onClick={onConfirm}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={scss.buttonContainer}>
              <MdOutlineDeleteSweep className={scss.icon} />
              <span>підтвердити</span>
            </div>
          </motion.button>
          <motion.button 
            onClick={onCancel}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={scss.buttonContainer}>
              <GiCancel className={scss.icon} />
              <span>скасувати</span>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Confirmation;
