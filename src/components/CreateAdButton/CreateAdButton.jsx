import { AiOutlinePlus } from 'react-icons/ai';
import { useTheme } from '../../context/ThemeContext.jsx';
import scss from './CreateAdButton.module.scss';

const CreateAdButton = ({ onClick }) => {
  const { isDarkMode } = useTheme();
  return (
    <div>
      <button
        className={`${scss.createAdButton} ${isDarkMode ? scss.darkMode : ''}`}
        onClick={onClick}
      >
        <h4>Додати оголошення</h4>
        <AiOutlinePlus className={scss.icon} />
      </button>
    </div>
  );
};

export default CreateAdButton;
