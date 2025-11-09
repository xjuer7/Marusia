import Api from "../../api/api.ts";
import { GenreItems } from "../../components/GenreItems/GenreItems.tsx";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Loader } from "../../components/Loader/Loader.tsx";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveUrl } from "../../store/UISlice.tsx";
import { setGenreList } from "../../store/MovieSlice.tsx";
import { MovieSliceState } from "../../store/MovieSlice.tsx";
import "../../base.scss";
import "./style.scss";

const GenrePage = () => {
  const dispatch = useDispatch()
  const genreState = useSelector((state:MovieSliceState) => state.data.genreList)

  const getGenres = async (): Promise<void> => {
    const data = await Api.getMoviesGenre();
    dispatch(setGenreList(data))
  };

  useEffect(() => {
    getGenres();
    dispatch(changeActiveUrl('/genre'))  
  }, []);

  if (!genreState) {
    return <Loader />;
  }

  return (
    <div className="content">
      <h2 className="content__title">Жанры фильмов</h2>
      <ul className="genre_list">
        {genreState.map((genre: string, index: number) => (
          <li key={index + 1} className="genre_item">
            <Link to={`/movie?genre=${genre}`}>
              <GenreItems title={genre}></GenreItems>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default GenrePage;
