import { motion, AnimatePresence } from "framer-motion";
import { TbLocation } from "react-icons/tb";
import { FiX } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import { useEffect } from "react";
import scss from "./ProductDescription.module.scss";

const ProductDescription = ({
  show,
  name,
  description,
  PLZ,
  city,
  onToggle,
}) => {
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onToggle();
    }
  };

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains(scss.modalOverlay)) {
      onToggle();
    }
  };

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={scss.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            className={`${scss.productDescription} ${scss.visible}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className={scss.container}>
              <div className={scss.titleContainer}>
                <h3 className={scss.title}>{name}</h3>
                <button onClick={onToggle}>
                  <FiX className={scss.icon} />
                </button>
              </div>
              <div>
                <p className={scss.desc}>{description}</p>
              </div>
              <div className={scss.locationContainer}>
                <div className={scss.locationItem}>
                  <TbLocation className={scss.icon} />
                  <p>{PLZ}</p>
                </div>
                <div className={scss.locationItem}>
                  <SlLocationPin className={scss.icon} />
                  <p>{city}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductDescription;
