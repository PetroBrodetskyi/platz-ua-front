import scss from './FormInput.module.scss';

const FormInput = ({
  id,
  label,
  register,
  errors,
  placeholder,
  onChange,
  value,
  isDarkMode,
  type = 'text'
}) => (
  <div className={scss.formGroup}>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      type={type}
      {...register(id, { required: true })}
      placeholder={placeholder}
      autoComplete="on"
      onChange={onChange}
      value={value}
      className={`${scss.input} ${isDarkMode ? scss.darkMode : ''}`}
    />
    {errors[id] && <span>Це поле обов&apos;язкове</span>}
  </div>
);

export default FormInput;
