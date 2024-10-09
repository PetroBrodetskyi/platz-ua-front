import { HiOutlineViewGrid } from 'react-icons/hi';
import { FaList } from 'react-icons/fa';
import Tooltip from '@mui/material/Tooltip';
import scss from './ViewToggle.module.scss';

const ViewToggle = ({ viewMode, setViewMode }) => {
  return (
    <div className={scss.viewToggle}>
      <Tooltip title="Сітка" placement="left">
        <button
          className={`${scss.viewButton} ${viewMode === 'grid' ? scss.active : ''}`}
          onClick={() => setViewMode('grid')}
        >
          <HiOutlineViewGrid className={scss.icon} />
        </button>
      </Tooltip>
      <Tooltip title="Список" placement="right">
        <button
          className={`${scss.viewButton} ${viewMode === 'list' ? scss.active : ''}`}
          onClick={() => setViewMode('list')}
        >
          <FaList className={scss.icon} />
        </button>
      </Tooltip>
    </div>
  );
};

export default ViewToggle;
