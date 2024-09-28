import { IoClose } from "react-icons/io5";
import scss from "./LocationInput.module.scss";

const LocationInput = ({
  id,
  register,
  errors,
  placeholder,
  onChange,
  onClear,
  value,
}) => (
  <div className={scss.formGroup}>
    <div className={scss.inputPlz}>
      <input
        id={id}
        type="text"
        {...register(id, { required: true })}
        placeholder={placeholder}
        autoComplete="off"
        onChange={onChange}
        value={value}
      />
      <button
        type="button"
        className={scss.clearButton}
        onClick={() => onClear(id)}
      >
        <IoClose className={scss.icon} />
      </button>
    </div>
    {errors[id] && <span>Це поле обов'язкове</span>}
  </div>
);

export default LocationInput;
