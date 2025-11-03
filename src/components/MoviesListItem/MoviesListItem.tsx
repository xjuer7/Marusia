import { Link } from "react-router-dom"
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { removeFavoriteMovie } from "../../api/MoviesApi";
import { queryClient } from "../../api/queryClient";
import { updateUserInfo } from "../../store/AuthSlice";
import { useState } from "react";

export const MoviesListItem = ({movie, num, index, btn}) => {
    const dispatch = useDispatch();
    const [isRemove, setIsRemove] = useState(false)

      const removeFavoriteMutation = useMutation(
    {
      mutationFn: async (id:string) => removeFavoriteMovie(id),
      onMutate() {
        setIsRemove(true)
      },
      onSuccess(data) {
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        dispatch(updateUserInfo(data));
      }
    }, queryClient)

    const handleRemoveItem = () => {
        removeFavoriteMutation.mutate(movie.id)
    }

    return (
        <li className={`movie_list__item ${isRemove ? 'remove' : ''}`}>
            <Link to={`/movie/${movie.id}`} draggable="false">
            {num && <span className="movie_list__num">{index + 1}</span>}
            {movie.posterUrl ? 
            <img src={movie.posterUrl} alt={`${movie.title}`} className='movie_list__item_img' />
            : <div className='movie_list__item_none'>
                <span>{movie.title}</span></div>}
            </Link>

            {btn && <button onClick={handleRemoveItem} className="movie_list__btn-close" aria-label="Удалить фильм из списка"><svg className="auth__btn_icon ">
              <use href="/icon/sprite.svg#icon-axis" />
            </svg></button>}
        </li>
    )
}