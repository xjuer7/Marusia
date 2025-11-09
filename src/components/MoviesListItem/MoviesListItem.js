import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { removeFavoriteMovie } from "../../api/MoviesApi.ts";
import { queryClient } from "../../api/queryClient.ts";
import { updateUserInfo } from "../../store/AuthSlice.tsx";
import { useState } from "react";
export const MoviesListItem = ({ movie, num, index, btn }) => {
    const dispatch = useDispatch();
    const [isRemove, setIsRemove] = useState(false);
    const removeFavoriteMutation = useMutation({
        mutationFn: async (id) => removeFavoriteMovie(id),
        onMutate() {
            setIsRemove(true);
        },
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            dispatch(updateUserInfo(data));
        }
    }, queryClient);
    const handleRemoveItem = () => {
        removeFavoriteMutation.mutate(movie.id);
    };
    return (_jsxs("li", { className: `movie_list__item ${isRemove ? 'remove' : ''}`, children: [_jsxs(Link, { to: `/movie/${movie.id}`, draggable: "false", children: [num && _jsx("span", { className: "movie_list__num", children: index + 1 }), movie.posterUrl ?
                        _jsx("img", { src: movie.posterUrl, alt: `${movie.title}`, className: 'movie_list__item_img' })
                        : _jsx("div", { className: 'movie_list__item_none', children: _jsx("span", { children: movie.title }) })] }), btn && _jsx("button", { onClick: handleRemoveItem, className: "movie_list__btn-close", "aria-label": "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u043C \u0438\u0437 \u0441\u043F\u0438\u0441\u043A\u0430", children: _jsx("svg", { className: "auth__btn_icon ", children: _jsx("use", { href: "/icon/sprite.svg#icon-axis" }) }) })] }));
};
