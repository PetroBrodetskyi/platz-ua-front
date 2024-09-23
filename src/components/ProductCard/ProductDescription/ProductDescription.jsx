import { motion, AnimatePresence } from 'framer-motion';
import { TbLocation } from 'react-icons/tb';
import { FiX } from 'react-icons/fi';
import { SlLocationPin } from 'react-icons/sl';
import scss from './ProductDescription.module.scss';

const ProductDescription = ({ show, description, PLZ, city, onToggle }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`${scss.productDescription} ${scss.visible}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={scss.paragraphContainer}>
            <div>
              <p className={scss.desc}>{description}</p>
            </div>
            <div className={scss.locationContainer}>
              <div className={scss.locationItem}>
                <TbLocation />
                <p>{PLZ}</p>
              </div>
              <button onClick={onToggle}>
                <FiX className={scss.icon} />
              </button>
              <div className={scss.locationItem}>
                <SlLocationPin />
                <p>{city}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductDescription;
