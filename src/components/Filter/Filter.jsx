import Categories from '../Categories';
import scss from './Filter.module.scss';

const Filter = () => {
  return (
    <div className={scss.filter}>
      <Categories />
    </div>
  );
};

export default Filter;
