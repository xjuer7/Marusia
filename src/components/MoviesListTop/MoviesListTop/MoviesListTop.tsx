import { Movies } from "../../../models/Movies.ts";
import { MoviesListItem } from "../../MoviesListItem/MoviesListItem.tsx";
import './style.scss'

const MoviesListTop = ({ data, num }: { data: Movies, num:boolean }) => {
    return (
       <>
        {data ? (
        <div className="movies">
        <ul className={`movie_list`}>
                {data.map((movie, index) => (
                  <MoviesListItem movie={movie} num={num} index={index} btn={false}/>
                ))}
            </ul>
        </div>
      ) : (<div>Список пока пуст</div>)}
      </>
    )
}

export default MoviesListTop