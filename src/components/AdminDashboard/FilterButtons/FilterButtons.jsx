import SubmitButton from '../../SubmitButton';
import scss from '../AdminDashboard.module.scss';

const FilterButtons = ({ filter, setFilter }) => {
  const buttons = ['pending', 'approved', 'rejected', 'vip', 'archive'];

  return (
    <div className={scss.buttons}>
      {buttons.map((status) => (
        <SubmitButton
          key={status}
          onClick={() => setFilter(status)}
          buttonText={(() => {
            switch (status) {
              case 'pending':
                return 'На модерацію';
              case 'approved':
                return 'Затверджені';
              case 'rejected':
                return 'Відхилені';
              case 'vip':
                return 'VIP';
              case 'archive':
                return 'Архів';
              default:
                return status;
            }
          })()}
          isActive={filter === status}
        />
      ))}
    </div>
  );
};

export default FilterButtons;
