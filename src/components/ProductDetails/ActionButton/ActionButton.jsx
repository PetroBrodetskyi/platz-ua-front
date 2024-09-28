import { BsPencil } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import scss from "./ActionButton.module.scss";

const ActionButton = ({ isEditing, onClick }) => {
  return (
    <button
      className={`${scss.button} ${isEditing ? scss.saveButton : scss.editButton}`}
      onClick={onClick}
    >
      {isEditing ? (
        <>
          <GrUpdate className={scss.icon} />
        </>
      ) : (
        <>
          <BsPencil className={scss.icon} />
        </>
      )}
    </button>
  );
};

export default ActionButton;
