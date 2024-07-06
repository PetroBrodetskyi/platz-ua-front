import { PiSignInBold } from "react-icons/pi";
import scss from './SubmitButton.module.scss';

const SubmitButton = ({ buttonText, onSubmit, onClick }) => {
    switch (buttonText) {
        case 'Відправити':
            return (
                <button className={scss.button} type="submit">
                    {buttonText}
                </button>
            );
        case 'Реєстрація':
            return (
                <button
                    className={scss.button}
                    type="submit"
                    onClick={onSubmit}
                >
                    {buttonText}
                </button>
            );
        case 'Логін':
            return (
                <button
                    className={scss.button}
                    type="submit"
                    onClick={onSubmit}
                >
                    {buttonText}
                </button>
            );
        case 'Розмістити':
            return (
                <button
                    className={scss.button}
                    type="button"
                    onClick={onSubmit}
                >
                    {buttonText}
                </button>
            );
        case 'Увійти':
            return (
                <button
                    className={scss.buttonSignIn}
                    type="button"
                    onClick={onClick}
                >
                    {buttonText}
                    <PiSignInBold />
                </button>
            );
        default:
            return (
                <button
                    onClick={onClick}
                    className={scss.buttonWrapper}
                    type="submit"
                >
                    {buttonText}
                </button>
            );
    }
};

export default SubmitButton;
