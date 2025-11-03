import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieVideo from "../MovieVideo/MovieVideo";

import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { updateUserInfo, authModalOpen } from "../../store/AuthSlice";
import { addFavoriteMovie, removeFavoriteMovie } from "../../api/MoviesApi";
import { useDispatch, useSelector } from "react-redux";

const MovieBtnGroup = ({ data, mainPage, onChange }) => {
  const [openVideo, setOpenVideo] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const userFavorites = useSelector((state) => state.auth.userInfo.favorites);

  useEffect(() => {
    const found = userFavorites.some((id) => String(id) === String(data.id))
    setIsFavorite(found)
  },[])
  

  const handleWatchVideo = () => {
    setOpenVideo((prev) => !prev);
  };

  const addFavoriteMutation = useMutation(
    {
      mutationFn: async (id: string) => addFavoriteMovie(id),
      onSuccess(data) {
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        dispatch(updateUserInfo(data));
        setIsFavorite(true)
      },
    },
    queryClient
  );

  const removeFavoriteMutation = useMutation(
    {
      mutationFn: async (id:string) => removeFavoriteMovie(id),
      onSuccess(data) {
        // console.log(data);
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        dispatch(updateUserInfo(data));
        setIsFavorite(false)
      }
    }, queryClient)


  const addFavorite = () => {
    if(isAuth) {
      if(!isFavorite) {
        addFavoriteMutation.mutate(data.id); 
      } else {
        removeFavoriteMutation.mutate(data.id);
      }
    } else {
      dispatch(authModalOpen());
    }
  };

  return (
    <>
      <div className={`movie_btn_group ${!mainPage ? `movie_btn_group-card` : ``}`}>
        <button
          className={`movie__btn active`}
          aria-label="Просмотреть трейлер"
          onClick={handleWatchVideo}
        >
          Трейлер
        </button>

        <div className="movie_btn_group_secondary">

        {mainPage && (
          <Link
            to={`/movie/${data.id}`}
            className={`movie__btn `}
            aria-label="Переход на страницу фильма"
          >
            О фильме
          </Link>
        )}

        <button
          className={`movie__btn movie__btn-svg ${isFavorite ? `favorite` : 'favorite-none'}`}
          aria-label="Добавить в избранное"
          onClick={addFavorite}
        >
          <svg className='movie__btn_icon movie__btn_icon-like'>
            <use href="/icon/sprite.svg#icon-like" />
          </svg>
         
        </button>

        {mainPage && (
          <button
            className="movie__btn movie__btn-svg"
            aria-label="Новый случайный фильм"
            onClick={() => {
              onChange();
              setIsFavorite(false)
            }}
          >
            <svg className="movie__btn_icon">
              <use href="/icon/sprite.svg#icon-change" />
            </svg>
          </button>
        )}
        </div>
      </div>

      {openVideo && (
          <MovieVideo videoSrc={data.trailerUrl} onClick={handleWatchVideo} />
        )}
    </>
  );
};

export default MovieBtnGroup;
