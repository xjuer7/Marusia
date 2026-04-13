import { Loader } from "../Loader/Loader.tsx";
import { MoviesListItem } from "../MoviesListItem/MoviesListItem.tsx";
import { Movies } from "../../models/Movies.ts";
import './style.scss'


type MoviesListOnGenreProps = {
    data: Movies,
    onNext: () => void,
}


const MoviesListOnGenre = ({ data, onNext }:MoviesListOnGenreProps) => {
    return (
      <>
        {data ? (
        <>
        <ul className={`movie_list movie_list-genre`}>
            {data.map((movie, index) => (
                <MoviesListItem 
                key={movie.id} 
                movie={movie} 
                num={false} 
                index={index} 
                btn={false}/>
            ))}
        </ul>
            {data.length !== 50 && 
            <button className="movie_list__btn" onClick={onNext}>Загрузить еще</button>}
        </>
      ) : (<Loader/>)}
      </>
    )
}

export default MoviesListOnGenre