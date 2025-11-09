import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MoviesListOnGenre from "../MoviesListOnGenre/MoviesListOnGenre.tsx";
import { basicUrl } from "../../api/MoviesApi.ts";
import { Link } from "react-router-dom";
import { Loader } from "../Loader/Loader.tsx";
import '../MovieCardTemplate/style.scss';
import { useDispatch } from "react-redux";
import { changeActiveUrl } from "../../store/UISlice.tsx";
const MoviesFilteredGenre = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const searchGenre = searchParams.get("genre");
    const [list, setList] = useState(null);
    const dispatch = useDispatch();
    const getFilms = async () => {
        if (!searchGenre) {
            return;
        }
        const response = await fetch(`${basicUrl}?genre=${searchGenre}`);
        const data = await response.json();
        if (data.length === 0) {
            setList([]);
        }
        else {
            const sortedArr = data.sort((a, b) => b.tmdbRating - a.tmdbRating);
            setList(sortedArr);
        }
    };
    useEffect(() => {
        getFilms();
        dispatch(changeActiveUrl('/genre'));
    }, [searchGenre]);
    const searchGenreTitle = searchGenre
        ? `${searchGenre.slice(0, 1).toUpperCase()}${searchGenre.slice(1)}`
        : "";
    return (_jsx(_Fragment, { children: list ? (_jsx("div", { className: "content", children: list.length === 0 ? (_jsxs("div", { className: "content__notice", children: [_jsx("div", { children: "\u0414\u0430\u043D\u043D\u044B\u0439 \u0436\u0430\u043D\u0440 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442" }), _jsx(Link, { to: "/genre", className: "movie__btn", children: "\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u0436\u0430\u043D\u0440\u0430\u043C" })] })) : (_jsxs(_Fragment, { children: [_jsx("button", { className: "content__title content__title-btn", onClick: () => navigate(-1), children: searchGenreTitle }), _jsx(MoviesListOnGenre, { data: list })] })) })) : (_jsx(Loader, {})) }));
};
export default MoviesFilteredGenre;
