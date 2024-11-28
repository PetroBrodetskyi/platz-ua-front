import { AiOutlinePlus } from 'react-icons/ai';
import Tooltip from '@mui/material/Tooltip';
import scss from './CreateAdButton.module.scss';

const CreateAdButton = ({ onClick }) => {
  return (
    <Tooltip title="Додати оголошення" placement="left">
      <button className={scss.createAdButton} onClick={onClick}>
        <AiOutlinePlus className={scss.icon} />
      </button>
    </Tooltip>
  );
};

export default CreateAdButton;
