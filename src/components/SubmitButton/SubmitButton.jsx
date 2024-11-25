import scss from './SubmitButton.module.scss';

const SubmitButton = ({
  buttonText,
  onClick,
  type = 'button',
  className = ''
}) => {
  let buttonClass = scss.button;

  switch (true) {
    case ['Реєстрація', 'Логін', 'Розмістити'].includes(buttonText):
      buttonClass = scss.button;
      type = 'submit';
      break;

    case ['У кошик', 'У кошику'].includes(buttonText):
      buttonClass = scss.button;
      break;

    case buttonText === 'Знайти':
      buttonClass = scss.search;
      break;

    case buttonText === 'Відправити':
      buttonClass = scss.button;
      break;

    case [
      'Стежити',
      'Відстежується',
      'Повідомлення',
      'Затвердити',
      'Відхилити',
      'На модерацію',
      'Затверджені',
      'Відхилені',
      'Редагувати',
      'Видалити',
      'Зберегти',
      'Скасувати',
      'Підтвердити',
      'Ок',
      'Не зараз',
      'Увійти'
    ].includes(buttonText):
      buttonClass = scss.followSend;
      break;

    case buttonText === 'Написати':
      buttonClass = scss.send;
      break;

    case buttonText === 'Увійти':
      buttonClass = scss.enter;
      break;

    case buttonText === 'Додати':
      buttonClass = scss.add;
      break;

    default:
      buttonClass = scss.buttonWrapper;
  }

  return (
    <button
      className={`${buttonClass} ${className}`}
      type={type}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default SubmitButton;
