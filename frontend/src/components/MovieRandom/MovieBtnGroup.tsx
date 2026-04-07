import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieVideo from "../MovieVideo/MovieVideo.tsx";

import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient.ts";
import { updateUserInfo, authModalOpen,AuthInitialState } from "../../store/AuthSlice.tsx";
import { addFavoriteMovie, removeFavoriteMovie } from "../../api/MoviesApi.ts";
import { useDispatch, useSelector } from "react-redux";
import { IMovie } from "../../models/Movies.ts";

const MovieBtnGroup = ({ data, mainPage, onChange }: { data:IMovie, mainPage: boolean, onChange?: () => void }) => {
  const [openVideo, setOpenVideo] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

  const isAuth = useSelector((state:AuthInitialState) => state.auth.isAuthenticated);
  const userFavorites = useSelector((state:AuthInitialState) => state.auth.userInfo.favorites);

  useEffect(() => {
    const found = userFavorites ? userFavorites.some((id) => String(id) === String(data.id)) : false;
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
              if(onChange) onChange();
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
