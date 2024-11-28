import { motion } from 'framer-motion';
import SubmitButton from '../SubmitButton';
import { useTheme } from '../../context/ThemeContext';
import scss from './Confirmation.module.scss';

const Dialog = ({ message, buttons, onClose, darkModeClass }) => {
  return (
    <motion.div
      className={scss.dialogOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`${scss.dialogBox} ${darkModeClass}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <p>{message}</p>
        <div className={scss.dialogButtons}>
          {buttons.map(({ onClick, text }, index) => (
            <SubmitButton key={index} onClick={onClick} buttonText={text} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Confirmation = ({ message, onConfirm, onCancel }) => {
  const { isDarkMode } = useTheme();
  return (
    <Dialog
      message={message}
      onClose={onCancel}
      darkModeClass={isDarkMode ? scss.darkMode : ''}
      buttons={[
        { onClick: onConfirm, text: 'Підтвердити' },
        { onClick: onCancel, text: 'Скасувати' }
      ]}
    />
  );
};

const ConfirmationOk = ({ message, onClose }) => {
  return (
    <Dialog
      message={message}
      onClose={onClose}
      buttons={[{ onClick: onClose, text: 'Ок' }]}
    />
  );
};

const ConfirmationLogin = ({ message, onConfirm, onCancel }) => {
  return (
    <Dialog
      message={message}
      onClose={onCancel}
      buttons={[
        { onClick: onConfirm, text: 'Увійти' },
        { onClick: onCancel, text: 'Не зараз' }
      ]}
    />
  );
};

export { Confirmation, ConfirmationOk, ConfirmationLogin };
