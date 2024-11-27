import scss from './CreateCondition.module.scss';

const Condition = ({ condition, addedDate }) => {
  return (
    <div className={scss.container}>
      <p className={scss.condition}>{condition}</p>
      <p className={scss.addedDate}>
        {new Date(addedDate).toLocaleDateString()}
      </p>
    </div>
  );
};

export default Condition;
