import { toHoursAndMinutes } from "../../MovieCardTemplate/MovieCardTemplate";
import { checkBgRating } from "../../MovieCardTemplate/MovieCardTemplate";
import './search.scss'

const HeaderSearch = ({ data }) => {
  return (
    <div className="header-search__container">
      <img src={data.posterUrl} alt="постер" className="header-search__img" />
      <div className="header-search__content">
        <div className="header-search__text">
          <span
            style={{ backgroundColor: checkBgRating(data.tmdbRating) }}
            className="header-search__stars"
          >
            <img src="/icon/star.svg" alt="иконка" />
            {data.tmdbRating}
          </span>
          {data.releaseYear && (
            <span className="header-search__year">{data.releaseYear}</span>
          )}
          {data!.genres && (
            <span className="header-search__genre">
              {data!.genres.join(", ")}
            </span>
          )}
          <span className="header-search__runtime">
            {toHoursAndMinutes(data!.runtime)}
          </span>
        </div>
        <h4 className="header-search__title">{data!.title}</h4>
      </div>
    </div>
  );
};
export default HeaderSearch;
