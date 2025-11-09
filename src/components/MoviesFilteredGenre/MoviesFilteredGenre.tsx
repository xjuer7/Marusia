import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMovie, Movies } from "../../models/Movies.ts";
import MoviesListOnGenre from "../MoviesListOnGenre/MoviesListOnGenre.tsx";
import { basicUrl } from "../../api/MoviesApi.ts";
import { Link } from "react-router-dom";
import { Loader } from "../Loader/Loader.tsx";
import '../MovieCardTemplate/style.scss'
import { useDispatch } from "react-redux";
import { changeActiveUrl } from "../../store/UISlice.tsx";

const MoviesFilteredGenre = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search);
  const searchGenre: string | null = searchParams.get("genre") ;
  const [list, setList] = useState<Movies | null>(null);
  const dispatch = useDispatch()

  const getFilms = async (): Promise<void> => {
    if (!searchGenre) {
      return;
    }
    const response = await fetch(`${basicUrl}?genre=${searchGenre}`);
    const data = await response.json();

    if (data.length === 0) {
      setList([]);
    } else {
      const sortedArr = data.sort((a:IMovie, b:IMovie) => b.tmdbRating - a.tmdbRating);
      setList(sortedArr);
    }
  };

  useEffect(() => {
    getFilms();
    dispatch(changeActiveUrl('/genre')) 
  }, [searchGenre]);

  const searchGenreTitle = searchGenre 
  ? `${searchGenre.slice(0, 1).toUpperCase()}${searchGenre.slice(1)}`
  : "";

  return (
    <>
      {list ? (
        <div className="content">
          {list.length === 0 ? (
            <div className="content__notice">
              <div>Данный жанр отсутствует</div>
              <Link to={"/genre"} className="movie__btn">Вернуться к жанрам</Link>
            </div>
          ) : (
            <>
            <button className="content__title content__title-btn" onClick={() => navigate(-1)}>{searchGenreTitle}</button>
              <MoviesListOnGenre data={list} />
            </>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MoviesFilteredGenre;
