import { PiSignInBold } from 'react-icons/pi';
import scss from './SubmitButton.module.scss';

const SubmitButton = ({ buttonText, onClick }) => {
  switch (buttonText) {
    case 'Відправити':
    case 'Реєстрація':
    case 'Логін':
    case 'Розмістити':
    case 'Увійти':
    case 'У кошик':
    case 'У кошику':
      return (
        <button className={scss.button} type="button" onClick={onClick}>
          {buttonText}
        </button>
      );

    default:
      return (
        <button onClick={onClick} className={scss.buttonWrapper} type="submit">
          {buttonText}
        </button>
      );
  }
};

export default SubmitButton;
