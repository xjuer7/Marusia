import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Api from "../../api/api.ts";
import { useEffect  } from "react";
import MovieCardTemplate from "../MovieCardTemplate/MovieCardTemplate.tsx";
import { setMoviesCard, MovieSliceState} from "../../store/MovieSlice.tsx";
import "./style.scss";

const MovieCard = () => {
  const dispatch = useDispatch()
  const movieState = useSelector((state:MovieSliceState) => state.data.moviesCard);

  const { movieId } = useParams();

  const getData = async (movieId: string | undefined) => {
    const data = await Api.getMovie(movieId); 
    dispatch(setMoviesCard(data))
  };

  useEffect(() => {
    getData(movieId);
  }, [movieId]);


  return (
    <div>
      {movieState ? (
        <div className="content">
          <MovieCardTemplate
            data={movieState}
            mainPage={false}
          />
          <div className="movie__parameter">
            <h2 className="movie__parameter_title">О фильме</h2>
            <table className="movie__parameter_table">
              <tbody>
                {movieState.language && (
                  <tr className="movie__parameter_item">
                    <td className="movie__parameter_wrapper">
                      <div className="movie__parameter_name">Язык оригинала</div>
                      <div className="movie__parameter_empty"></div>
                    </td>
                    <td>{movieState.language}</td>
                  </tr>
                )}
                {movieState.budget && (
                  <tr className="movie__parameter_item">
                    <td className="movie__parameter_wrapper">
                      <div className="movie__parameter_name">Бюджет</div>
                      <div className="movie__parameter_empty"></div>
                    </td>
                    <td>{movieState.budget}</td>
                  </tr>
                )}
                {movieState.revenue && (
                  <tr className="movie__parameter_item">
                    <td className="movie__parameter_wrapper">
                      <div className="movie__parameter_name">Выручка</div>
                      <div className="movie__parameter_empty"></div>
                    </td>
                    <td>{movieState.revenue}</td>
                  </tr>
                )}
                {movieState.director && (
                  <tr className="movie__parameter_item">
                    <td className="movie__parameter_wrapper">
                      <div className="movie__parameter_name">Режиссёр</div>
                      <div className="movie__parameter_empty"></div>
                    </td>
                    <td>{movieState.director}</td>
                  </tr>
                )}

                {movieState.production && (
                  <tr className="movie__parameter_item">
                    <td className="movie__parameter_wrapper">
                      <div className="movie__parameter_name">Продакшен</div>
                      <div className="movie__parameter_empty"></div>
                    </td>
                    <td>{movieState.production}</td>
                  </tr>
                )}

                {movieState.awardsSummary && (
                  <tr className="movie__parameter_item">
                    <td className="movie__parameter_wrapper">
                      <div className="movie__parameter_name">Награды</div>
                      <div className="movie__parameter_empty"></div>
                    </td>
                    <td>{movieState.awardsSummary}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default MovieCard;
