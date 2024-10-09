import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import scss from './CreateAdButton.module.scss';

const CreateAdButton = () => {
  const navigate = useNavigate();

  const navigateToCreateAd = () => {
    navigate('/create');
  };

  return (
    <Tooltip title="Додати оголошення" placement="left">
      <button className={scss.createAdButton} onClick={navigateToCreateAd}>
        <AiOutlinePlus className={scss.icon} />
      </button>
    </Tooltip>
  );
};

export default CreateAdButton;
