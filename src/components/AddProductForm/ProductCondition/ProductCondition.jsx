import scss from './ProductCondition.module.scss';

const ProductCondition = ({ register, errors }) => {
  return (
    <div className={scss.stateGroup}>
      <div>
        <label htmlFor="new">
          <div className={scss.stateButton}>
            <input type="radio" id="new" value="новий" {...register('condition', { required: true })} />
            <span>Новий</span>
          </div>
        </label>
      </div>
      <div>
        <label htmlFor="used">
          <div className={scss.stateButton}>
            <input type="radio" id="used" value="вживаний" {...register('condition', { required: true })} />
            <span>Вживаний</span>
          </div>
        </label>
      </div>
      {errors.condition && <span className={scss.error}>Це поле обов'язкове</span>}
    </div>
  );
};

export default ProductCondition;
