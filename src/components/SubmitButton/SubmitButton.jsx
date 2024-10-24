import scss from './SubmitButton.module.scss';

const SubmitButton = ({ buttonText, onClick }) => {
  switch (buttonText) {
    case 'Реєстрація':
    case 'Логін':
    case 'Розмістити':
    case 'Увійти':
      return (
        <button className={scss.button} type="submit" onClick={onClick}>
          {buttonText}
        </button>
      );

    case 'Відправити':
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
