import { useState } from 'react';
import { Popover, Button, Fade } from '@mui/material';
import Categories from '../Categories';
import scss from './Catalog.module.scss';

const Catalog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  const handleToggleMenu = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  return (
    <div className={scss.catalog}>
      <Button onClick={handleToggleMenu} className={scss.catalogButton}>
        Каталог
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        className={scss.popover}
        TransitionComponent={Fade}
        transitionDuration={350}
        anchorOrigin={{
          vertical: 'bottom'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Categories onSubcategoriesChange={setSelectedSubcategories} />
      </Popover>
    </div>
  );
};

export default Catalog;
