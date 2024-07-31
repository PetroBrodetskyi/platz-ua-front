import { BsPencil } from 'react-icons/bs';
import { GrUpdate } from "react-icons/gr";
import scss from './ActionButton.module.scss';

const ActionButton = ({ isEditing, onClick }) => {
  return (
    <button
      className={`${scss.button} ${isEditing ? scss.saveButton : scss.editButton}`}
      onClick={onClick}
    >
      {isEditing ? (
        <>
          <GrUpdate className={scss.icon} />
          <span className={scss.text}>зберегти</span>
        </>
      ) : (
        <>
          <BsPencil className={scss.icon} />
          <span className={scss.text}>редагувати</span>
        </>
      )}
    </button>
  );
};

export default ActionButton;
