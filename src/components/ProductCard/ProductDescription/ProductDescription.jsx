import Modal from "react-modal";
import { TbLocation } from "react-icons/tb";
import { FiX } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import { useEffect } from "react";
import scss from "./ProductDescription.module.scss";

Modal.setAppElement("#root");

const ProductDescription = ({ show, name, description, PLZ, city, onToggle }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
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
    <Modal
      isOpen={show}
      onRequestClose={onToggle}
      overlayClassName={scss.modalOverlay}
      className={scss.productDescription}
      contentLabel="Product Description"
      shouldCloseOnOverlayClick={true}
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
    </Modal>
  );
};

export default ProductDescription;
