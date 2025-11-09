import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieVideo from "../MovieVideo/MovieVideo.tsx";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient.ts";
import { updateUserInfo, authModalOpen } from "../../store/AuthSlice.tsx";
import { addFavoriteMovie, removeFavoriteMovie } from "../../api/MoviesApi.ts";
import { useDispatch, useSelector } from "react-redux";
const MovieBtnGroup = ({ data, mainPage, onChange }) => {
    const [openVideo, setOpenVideo] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const userFavorites = useSelector((state) => state.auth.userInfo.favorites);
    useEffect(() => {
        const found = userFavorites ? userFavorites.some((id) => String(id) === String(data.id)) : false;
        setIsFavorite(found);
    }, []);
    const handleWatchVideo = () => {
        setOpenVideo((prev) => !prev);
    };
    const addFavoriteMutation = useMutation({
        mutationFn: async (id) => addFavoriteMovie(id),
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            dispatch(updateUserInfo(data));
            setIsFavorite(true);
        },
    }, queryClient);
    const removeFavoriteMutation = useMutation({
        mutationFn: async (id) => removeFavoriteMovie(id),
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            dispatch(updateUserInfo(data));
            setIsFavorite(false);
        }
    }, queryClient);
    const addFavorite = () => {
        if (isAuth) {
            if (!isFavorite) {
                addFavoriteMutation.mutate(data.id);
            }
            else {
                removeFavoriteMutation.mutate(data.id);
            }
        }
        else {
            dispatch(authModalOpen());
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: `movie_btn_group ${!mainPage ? `movie_btn_group-card` : ``}`, children: [_jsx("button", { className: `movie__btn active`, "aria-label": "\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0442\u0440\u0435\u0439\u043B\u0435\u0440", onClick: handleWatchVideo, children: "\u0422\u0440\u0435\u0439\u043B\u0435\u0440" }), _jsxs("div", { className: "movie_btn_group_secondary", children: [mainPage && (_jsx(Link, { to: `/movie/${data.id}`, className: `movie__btn `, "aria-label": "\u041F\u0435\u0440\u0435\u0445\u043E\u0434 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0444\u0438\u043B\u044C\u043C\u0430", children: "\u041E \u0444\u0438\u043B\u044C\u043C\u0435" })), _jsx("button", { className: `movie__btn movie__btn-svg ${isFavorite ? `favorite` : 'favorite-none'}`, "aria-label": "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435", onClick: addFavorite, children: _jsx("svg", { className: 'movie__btn_icon movie__btn_icon-like', children: _jsx("use", { href: "/icon/sprite.svg#icon-like" }) }) }), mainPage && (_jsx("button", { className: "movie__btn movie__btn-svg", "aria-label": "\u041D\u043E\u0432\u044B\u0439 \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439 \u0444\u0438\u043B\u044C\u043C", onClick: () => {
                                    onChange();
                                    setIsFavorite(false);
                                }, children: _jsx("svg", { className: "movie__btn_icon", children: _jsx("use", { href: "/icon/sprite.svg#icon-change" }) }) }))] })] }), openVideo && (_jsx(MovieVideo, { videoSrc: data.trailerUrl, onClick: handleWatchVideo }))] }));
};
export default MovieBtnGroup;
