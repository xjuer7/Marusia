import Api from "../../api/api";
import { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMoviesCard } from "../../store/MovieSlice";
import MovieCardTemplate from "../MovieCardTemplate/MovieCardTemplate";
import "../MovieCardTemplate/style.scss";

const MovieRandom = () => {
  const dispatch = useDispatch()
  const dataState = useSelector((state) => state.data.moviesCard)

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
