import scss from './ProductCondition.module.scss';

const ProductCondition = ({ register, errors, isDarkMode }) => {
  return (
    <div className={scss.stateGroup}>
      <div className={scss.state}>
        <label htmlFor="new">
          <div
            className={`${scss.stateButton} ${isDarkMode ? scss.darkMode : ''}`}
          >
            <input
              type="radio"
              id="new"
              value="новий"
              {...register('condition', { required: true })}
            />
            <span>Новий</span>
          </div>
        </label>
      </div>
      <div className={scss.state}>
        <label htmlFor="used">
          <div
            className={`${scss.stateButton} ${isDarkMode ? scss.darkMode : ''}`}
          >
            <input
              type="radio"
              id="used"
              value="вживаний"
              {...register('condition', { required: true })}
            />
            <span>Вживаний</span>
          </div>
        </label>
      </div>
      {errors.condition && (
        <span className={scss.error}>Це поле обов&apos;язкове</span>
      )}
    </div>
  );
};

export default ProductCondition;
