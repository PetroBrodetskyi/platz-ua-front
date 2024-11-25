import { motion } from 'framer-motion';
import SubmitButton from '../SubmitButton';
import { useTheme } from '../../context/ThemeContext';
import scss from './Confirmation.module.scss';

const Confirmation = ({ message, onConfirm, onCancel }) => {
  const { isDarkMode } = useTheme();
  return (
    <motion.div
      className={scss.dialogOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`${scss.dialogBox} ${isDarkMode ? scss.darkMode : ''}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <p>{message}</p>
        <div className={scss.dialogButtons}>
          <SubmitButton onClick={onConfirm} buttonText="Підтвердити" />
          <SubmitButton onClick={onCancel} buttonText="Скасувати" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const ConfirmationOk = ({ message, onClose }) => {
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
          <SubmitButton
            onClick={onClose}
            buttonText="Ок"
            className={scss.followSend} // Apply 'followSend' style
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const ConfirmationLogin = ({ message, onConfirm, onCancel }) => {
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
          <SubmitButton
            onClick={onConfirm}
            buttonText="Увійти"
            className={scss.followSend} // Apply 'followSend' style
          />
          <SubmitButton
            onClick={onCancel}
            buttonText="Не зараз"
            className={scss.followSend} // Apply 'followSend' style
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export { Confirmation, ConfirmationOk, ConfirmationLogin };
