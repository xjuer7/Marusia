import { Link } from "react-router-dom"
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { removeFavoriteMovie } from "../../api/MoviesApi.ts";
import { queryClient } from "../../api/queryClient.ts";
import { updateUserInfo } from "../../store/AuthSlice.tsx";
import { useState } from "react";
import { Movie } from "../../models/Movies.ts";

type MovieListItemProps = {
  movie: Movie,
  num: boolean, 
  index: number, 
  btn: boolean,
}

export const MoviesListItem = ({movie, num, index, btn}: MovieListItemProps) => {
    const dispatch = useDispatch();
    const [isRemove, setIsRemove] = useState(false)

    const removeFavoriteMutation = useMutation(
    {
      mutationFn: async (id:number) => removeFavoriteMovie(id),
      onMutate() {
        setIsRemove(true)
      },
      onSuccess(data) {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        dispatch(updateUserInfo(data));
      }
    }, queryClient)

    const handleRemoveItem = () => removeFavoriteMutation.mutate(movie.id)

    return (
      <li
        className={`movie_list__item ${isRemove ? "remove" : ""}`}
        key={movie.id}
      >
        <Link to={`/movie/${movie.id}`} draggable="false">
          {num && <span className="movie_list__num">{index + 1}</span>}
          {(movie.poster?.previewUrl ?? movie.poster?.url) ? (
            <img
              src={movie.poster.previewUrl ?? movie.poster.url}
              alt={`${movie.name ?? movie.alternativeName}`}
              className="movie_list__item_img"
            />
          ) : (
            <div className="movie_list__item_none">
              <span>{movie.name ?? movie.alternativeName}</span>
            </div>
          )}
        </Link>

        {btn && (
          <button
            onClick={handleRemoveItem}
            className="movie_list__btn-close"
            aria-label="Удалить фильм из списка"
          >
            <svg className="auth__btn_icon ">
              <use href="/icon/sprite.svg#icon-axis" />
            </svg>
          </button>
        )}
      </li>
    );
}