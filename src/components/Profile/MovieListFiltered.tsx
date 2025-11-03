import Api from "../../api/api"
import { MoviesListItem } from "../MoviesListItem/MoviesListItem";
import { useEffect, useState } from "react";
import { Movies } from "../../models/Movies";
import '../MoviesListTop/MoviesListTop/style.scss'


const MovieListFiltered = ({arrMovie}) => {
    const [data, setData] = useState<Movies | null>(null);

    const getData = async (id: string) => {
        const data = await Api.getMovie(id);
        return data;
    }

    if (arrMovie.length > 0) {
        useEffect(() => {
                Promise.all(arrMovie.map(getData)).then((res) => setData(res))
            }, [arrMovie])
    } else {
        return <p>Список пуст</p>
    }

   

    return data && (
        <div className="movies">
                <ul className={`movie_list`}>
                        {data.map((movie, index) => (
                          <MoviesListItem movie={movie} num={false} index={index} key={movie.id} btn={true}/>
                        ))}
                    </ul>
                </div>
    )

}

export default MovieListFiltered