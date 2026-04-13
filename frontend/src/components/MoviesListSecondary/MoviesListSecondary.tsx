import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setMoviesTop10 } from "../../store/MovieSlice.tsx";
import { MovieSliceState } from "../../store/MovieSlice.tsx";
import { MoviesListItem } from "../MoviesListItem/MoviesListItem.tsx";

import Api from "../../api/api.ts";
import "./style.scss";

const MoviesListSecondary = ({ num }: { num: boolean }) => {
  const dispatch = useDispatch()
  const dataStateTop10 = useSelector((state:MovieSliceState) => state.data.moviesTop10)

  const getData = async (): Promise<void> => {
    const data = await Api.getMoviesTOP10();
    dispatch(setMoviesTop10(data))
  };

  useEffect(() => {
    if(dataStateTop10?.length) return 
    getData()
  }, [dataStateTop10])

  return (
    <>
      {dataStateTop10 && (
        <div className="movies">
          <ul className={`movie_list`}>
            {dataStateTop10.map((movie, index) => (
              <MoviesListItem
                movie={movie}
                num={num}
                index={index}
                btn={false}
                key={movie.id}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default MoviesListSecondary;
