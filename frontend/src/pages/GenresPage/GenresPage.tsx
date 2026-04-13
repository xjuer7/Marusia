import { GenreItems } from "../../components/GenreItems/GenreItems.tsx";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeActiveUrl } from "../../store/UISlice.tsx";
import { GENRES } from "../../models/Movies.ts";
import "../../base.scss";
import "./style.scss";

const GenrePage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changeActiveUrl('/genre'))  
  }, []);

  return (
    <div className="content">
      <h2 className="content__title">Жанры фильмов</h2>
      <ul className="genre_list">
        {GENRES.map((genre: string, index: number) => (
          <li key={index + 1} className="genre_item">
            <Link to={`/movie?genre.name=${encodeURIComponent(genre)}`} >
              <GenreItems title={genre}></GenreItems>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default GenrePage;
