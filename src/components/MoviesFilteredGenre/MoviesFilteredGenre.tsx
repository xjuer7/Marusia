import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Movies } from "../../models/Movies";
import MoviesListOnGenre from "../MoviesListOnGenre/MoviesListOnGenre";
import { basicUrl } from "../../api/MoviesApi";
import { Link } from "react-router-dom";
import { Loader } from "../Loader/Loader";
import '../MovieCardTemplate/style.scss'
import { useDispatch } from "react-redux";
import { changeActiveUrl } from "../../store/UISlice";

const MoviesFilteredGenre = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search);
  const searchGenre = searchParams.get("genre");
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
      const sortedArr = data.sort((a, b) => b.tmdbRating - a.tmdbRating);
      setList(sortedArr);
    }
  };

  useEffect(() => {
    getFilms();
    dispatch(changeActiveUrl('/genre')) 
  }, [searchGenre]);

  const searchGenreTitle =
    searchGenre?.slice(0, 1).toUpperCase() +
    searchGenre?.slice(1).toLowerCase();

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
