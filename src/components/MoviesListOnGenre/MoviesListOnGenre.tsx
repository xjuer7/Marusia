import {  useState } from "react";
import { Loader } from "../Loader/Loader";
import { MoviesListItem } from "../MoviesListItem/MoviesListItem";
import './style.scss'


const MoviesListOnGenre = ({ data }) => {
        const [currentItems, setCurrentItems] = useState(data.slice(0, 10));
        const [startItem, setStartItem] = useState(10);
    
    const handleClick = () => {
        const nextItems = data.slice(startItem, startItem + 10)
        setCurrentItems([...currentItems, ...nextItems])
        setStartItem(startItem + 10)
    }

    return (
      <>
        {data ? (
        <>
        <ul className={`movie_list movie_list-genre`}>
                {currentItems.map((movie, index) => (
                    <MoviesListItem movie={movie} num={false} index={index} key={movie.id}/>
                ))}
            </ul>
            {currentItems.length !== 50 && <button className="movie_list__btn" onClick={handleClick}>Показать еще</button>}
        </>
      ) : (<Loader/>)}
      </>
    )
}

export default MoviesListOnGenre