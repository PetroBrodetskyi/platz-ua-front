import { MdOutlineFavoriteBorder } from "react-icons/md";
import scss from './TitleFavorite.module.scss';

const TitleFavorite = ({ name }) => {
  return (
    <div className={scss.titleFavorite}>
      <h3>{name}</h3>
      <MdOutlineFavoriteBorder className={scss.favoriteIcon} />
    </div>
  );
};

export default TitleFavorite;
