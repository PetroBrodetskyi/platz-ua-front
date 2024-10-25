import scss from './SubmitButton.module.scss';

const SubmitButton = ({ buttonText, onClick }) => {
  switch (buttonText) {
    case 'Реєстрація':
    case 'Логін':
    case 'Розмістити':
      return (
        <button className={scss.button} type="submit" onClick={onClick}>
          {buttonText}
        </button>
      );

    case 'У кошик':
    case 'У кошику':
      return (
        <button className={scss.button} type="button" onClick={onClick}>
          {buttonText}
        </button>
      );

    case 'Знайти':
      return (
        <button className={scss.search} type="button" onClick={onClick}>
          {buttonText}
        </button>
      );

    case 'Увійти':
      return (
        <button className={scss.button} type="button" onClick={onClick}>
          {buttonText}
        </button>
      );

    case 'Відправити':
      return (
        <button className={scss.button} type="button" onClick={onClick}>
          {buttonText}
        </button>
      );

    case 'Підписатися':
    case 'Повідомлення':
      return (
        <button className={scss.followSend} type="button" onClick={onClick}>
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
