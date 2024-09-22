import { HiOutlineViewGrid } from 'react-icons/hi';
import { FaList } from 'react-icons/fa';
import scss from './ViewToggle.module.scss';

const ViewToggle = ({ viewMode, setViewMode }) => {
  return (
    <div className={scss.viewToggle}>
      <button
        className={`${scss.viewButton} ${viewMode === 'grid' ? scss.active : ''}`}
        onClick={() => setViewMode('grid')}
      >
        <HiOutlineViewGrid className={scss.icon} />
      </button>
      <button
        className={`${scss.viewButton} ${viewMode === 'list' ? scss.active : ''}`}
        onClick={() => setViewMode('list')}
      >
        <FaList className={scss.icon} />
      </button>
    </div>
  );
};

export default ViewToggle;

