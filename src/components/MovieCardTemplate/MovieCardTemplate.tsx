import { Loader } from "../Loader/Loader.tsx";
import MovieBtnGroup from "../MovieRandom/MovieBtnGroup.tsx";
import { IMovie } from "../../models/Movies.ts";
import "./style.scss";
// import "../../base.scss";


const MovieCardTemplate = ({ data, mainPage, onChange }: { data: IMovie, mainPage:boolean, onChange?:() => void }) => {

  return (
    <>
    {data ? (
    <div className="movie">
      <div className="movie__info">
        <div className="movie__details">
          <div className="movie__text">
            <span
              style={{ backgroundColor: checkBgRating(data.tmdbRating) }}
              className="movie__stars"
            >
              <img src="/icon/star.svg" alt="иконка" />
              {data.tmdbRating}
            </span>
            {data.releaseYear && (
              <span className="movie__year">{data.releaseYear}</span>
            )}
            {data!.genres && (
              <span className="movie__genre">{data!.genres.join(", ")}</span>
            )}
            <span className="movie__runtime">
              {toHoursAndMinutes(data!.runtime)}
            </span>
          </div>
          <h1 className="movie__title">{data!.title}</h1>
          <p className="movie__descr">{data!.plot}</p>
        </div>

        <MovieBtnGroup
            data={data}
            mainPage={mainPage}
            onChange={onChange}
          />
      </div>

      {data!.posterUrl ? (
        <div className="movie__poster">
          <img
          className="movie__poster-img"
          src={data.posterUrl}
          alt={`Постер к фильму ${data.title}`}
        />
        </div>
      ) : (
        <div className="movie__poster_none">Постер временно отсутствует</div>
      )}
    </div>
    ): (<div></div>)}</>
  )
};

export default MovieCardTemplate;

export const toHoursAndMinutes = (time: number) => {
  const hours = Math.floor(time / 60);
  const min = time % 60;

  if (hours === 0) {
    return `${time} min`;
  }
  const hoursEnds = hours > 1 ? `${hours} hours` : `${hours} hour`;

  if (min === 0) {
    return hoursEnds;
  }

  return `${hoursEnds} ${min} min`;
};

export const checkBgRating = (rating: number) => {
  if (rating >= 8.6) {
    return "#A59400";
  } else if (rating >= 7.5) {
    return "#308e21";
  } else if (rating >= 6.3) {
    return "#747474";
  } else {
    return "#C82020";
  }
};
