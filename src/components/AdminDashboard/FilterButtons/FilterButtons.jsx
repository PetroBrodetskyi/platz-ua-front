import SubmitButton from '../../SubmitButton';
import scss from '../AdminDashboard.module.scss';

const FilterButtons = ({ filter, setFilter }) => {
  const buttons = ['pending', 'approved', 'rejected'];

  return (
    <div className={scss.buttons}>
      {buttons.map((status) => (
        <SubmitButton
          key={status}
          onClick={() => setFilter(status)}
          buttonText={
            status === 'pending'
              ? 'На модерацію'
              : status === 'approved'
                ? 'Затверджені'
                : 'Відхилені'
          }
          isActive={filter === status}
        />
      ))}
    </div>
  );
};

export default FilterButtons;
