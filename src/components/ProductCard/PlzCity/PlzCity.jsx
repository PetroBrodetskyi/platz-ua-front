import scss from './PlzCity.module.scss';

const PlzCity = ({ plz, city }) => {

  return (
    <div className={scss.locationContainer}>
      <p>{plz}</p>
      <p>{city}</p>
    </div>
  );
};

export default PlzCity;
