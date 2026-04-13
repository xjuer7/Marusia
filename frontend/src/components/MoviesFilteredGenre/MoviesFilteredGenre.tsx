import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Movie, Movies } from "../../models/Movies.ts";
import MoviesListOnGenre from "../MoviesListOnGenre/MoviesListOnGenre.tsx";
import { basicMovieUrl } from "../../api/MoviesApi.ts";
import { Link } from "react-router-dom";
import { Loader } from "../Loader/Loader.tsx";
import '../MovieCardTemplate/style.scss'
import { useDispatch } from "react-redux";
import { changeActiveUrl } from "../../store/UISlice.tsx";
import { getMovieOnGenre } from "../../api/MoviesApi.ts";

const MoviesFilteredGenre = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchGenre: string | null = searchParams.get("genre.name") ;
  const searchPage  = +(searchParams.get("page") || "1")

  const [list, setList] = useState<Movies | null>(null);

  const getFilms = async (): Promise<void> => {
    if (!searchGenre) return
    const data = await getMovieOnGenre(searchGenre, String(searchPage))
    setList(prev => searchPage === 1 ? data.docs : [...(prev ?? []), ...data.docs])
    console.log(list)
  };

  const searchGenreTitle = searchGenre 
  ? `${searchGenre.slice(0, 1).toUpperCase()}${searchGenre.slice(1)}`
  : "";

  const goToPage = (nextPage:string) => {
    if(!searchGenre) return

    setSearchParams({
      'genre.name': searchGenre,
      'page': nextPage,
    })
  }

   useEffect(() => {
    getFilms();
    dispatch(changeActiveUrl('/genre')) 
  }, [searchGenre, searchPage]);

  return (
    <>
      {list ? (
        <div className="content">
          {list.length === 0 ? (
            <div className="content__notice">
              <div>Данный жанр отсутствует</div>
              <Link to={"/genre"} className="movie__btn">
                Вернуться к жанрам
              </Link>
            </div>
          ) : (
            <>
              <button
                className="content__title content__title-btn"
                onClick={() => navigate('/genre')}
              >
                {searchGenreTitle}
              </button>

              <MoviesListOnGenre
                data={list}
                onNext={() => goToPage(String(searchPage + 1))}
              />
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
