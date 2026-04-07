import Api from "../../api/api.ts";
import { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMoviesCard, MovieSliceState } from "../../store/MovieSlice.tsx";
import MovieCardTemplate from "../MovieCardTemplate/MovieCardTemplate.tsx";
import "../MovieCardTemplate/style.scss";

const MovieRandom = () => {
  const dispatch = useDispatch()
  const dataState = useSelector((state: MovieSliceState) => state.data.moviesCard)

  const getData = async (): Promise<void>  => { 
     const data = await Api.getMovieRandom();
     dispatch(setMoviesCard(data))
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChangeFilm = () => {
    getData();
  };

  return (
    <>
      {dataState ? (
        <MovieCardTemplate
          data={dataState}
          mainPage={true}
          onChange={handleChangeFilm}
        />
      ) : (
        <div></div>
      )}
    </>
  );
};

export default MovieRandom;
