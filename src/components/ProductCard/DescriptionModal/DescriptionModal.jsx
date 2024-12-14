import BaseModal from '../../BaseModal';
import { TbLocation } from 'react-icons/tb';
import { SlLocationPin } from 'react-icons/sl';
import scss from './DescriptionModal.module.scss';

const DescriptionModal = ({
  show,
  onToggle,
  name,
  description,
  image,
  PLZ,
  city
}) => {
  return (
    <BaseModal
      show={show}
      onToggle={onToggle}
      contentLabel="Опис продукту"
      title={name}
    >
      <div className={scss.imageDescription}>
        <div className={scss.imageContainer}>
          <img src={image} alt={name} className={scss.image} />
        </div>
        <div className={scss.description}>
          <p className={scss.desc}>{description}</p>
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
      </div>
    </BaseModal>
  );
};

export default DescriptionModal;
