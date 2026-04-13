import { Loader } from "../Loader/Loader.tsx";
import MovieBtnGroup from "../MovieRandom/MovieBtnGroup.tsx";
import { Movie } from "../../models/Movies.ts";
import "./style.scss";
// import "../../base.scss";


const MovieCardTemplate = ({ data, mainPage, onChange }: { data: Movie, mainPage:boolean, onChange?:() => void }) => {

  const actors = data.persons
  ?.filter((person) => person.enProfession == 'actor')
  .slice(0, 10)
  .map((person) => person.enName ?? person.name)

  return (
    <>
    {data ? (
    <div className="movie">
      <div className="movie__info">
        <div className="movie__details">
          <div className="movie__text">
            <span
              style={{ backgroundColor: checkBgRating(data.rating.imdb) }}
              className="movie__stars"
            >
              <img src="/icon/star.svg" alt="иконка" />
              {data.rating.imdb}
            </span>
            {data.year && (
              <span className="movie__year">{data.year}</span>
            )}
            {data.genres && (
              <span className="movie__genre">{
                data.genres.map(({name}) => name).join(', ')
              }</span>
            )}
            {data.countries && (
              <span className="movie__genre">{
                data.countries.map(({name}) => name).join(', ')
              }</span>
            )}
            {data.movieLength && (
              <span className="movie__runtime">
              {toHoursAndMinutes(data.movieLength)}
            </span>
            )}
          </div>
          <h1 className="movie__title">{data.name ?? data.alternativeName }</h1>
          <p className="movie__descr">{data.description}</p>
          {actors && (
            <span className="movie__text">Актеры: {actors.join(', ')}</span>
          )}
        </div>

        <MovieBtnGroup
            data={data}
            mainPage={mainPage}
            onChange={onChange}
          />
      </div>

      {data.poster ? (
        <div className="movie__poster">
          <img
          className="movie__poster-img"
          src={data.poster.url ?? data.poster.previewUrl}
          alt={`Постер к фильму ${data.name}`}
        />
        </div>
      ) : (
        <div className="movie__poster_none">постер временно отсутствует</div>
      )}
    </div>
    ): (<div></div>)}</>
  )
};

export default MovieCardTemplate;

export const toHoursAndMinutes = (time: number) => {
  const hours = Math.floor(time / 60);
  const min = time % 60;
  if (hours === 0) return `${time} min`;

  const hoursEnds = hours > 1 ? `${hours} hours` : `${hours} hour`;
  if (min === 0) return hoursEnds;

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
