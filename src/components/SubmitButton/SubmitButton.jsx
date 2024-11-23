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

    case 'Відправити':
      return (
        <button className={scss.button} type="button" onClick={onClick}>
          {buttonText}
        </button>
      );

    case 'Стежити':
    case 'Відстежується':
    case 'Повідомлення':
    case 'Затвердити':
    case 'Відхилити':
    case 'На модерацію':
    case 'Затверджені':
    case 'Відхилені':
    case 'Редагувати':
      return (
        <button className={scss.followSend} type="button" onClick={onClick}>
          {buttonText}
        </button>
      );

    case 'Написати':
      return (
        <button className={scss.send} type="button" onClick={onClick}>
          {buttonText}
        </button>
      );

    case 'Увійти':
      return (
        <button className={scss.enter} type="button" onClick={onClick}>
          {buttonText}
        </button>
      );

    case 'Додати':
      return (
        <button className={scss.add} type="button" onClick={onClick}>
          {buttonText}
        </button>
      );

    default:
      return (
        <button onClick={onClick} className={scss.buttonWrapper} type="button">
          {buttonText}
        </button>
      );
  }
};

export default SubmitButton;
