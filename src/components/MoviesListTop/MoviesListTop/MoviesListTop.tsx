import { Loader } from "../../Loader/Loader";
import { MoviesListItem } from "../../MoviesListItem/MoviesListItem";
import './style.scss'

const MoviesListTop = ({ data, num }) => {
    return (
       <>
        {data ? (
        <div className="movies">
        <ul className={`movie_list`}>
                {data.map((movie, index) => (
                  <MoviesListItem movie={movie} num={true} index={index} key={movie.id} btn={false}/>
                ))}
            </ul>
        </div>
      ) : (<div>Список пока пуст</div>)}
      </>
    )
}

export default MoviesListTop