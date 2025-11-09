import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Api from "../../api/api.ts";
import { useEffect, lazy } from "react";
import MovieRandom from "../../components/MovieRandom/MovieRandom.tsx";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveUrl } from "../../store/UISlice.tsx";
import { useLocation } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader.tsx";
import { Suspense } from "react";
import { setMoviesList } from "../../store/MovieSlice.tsx";
import '../../base.scss';
const LazyMoviesListTop = lazy(() => import("../../components/MoviesListTop/MoviesListTop/MoviesListTop.tsx"));
const MainPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const dataState = useSelector((state) => state.data.moviesList);
    const getData = async () => {
        const data = await Api.getMoviesTOP10();
        dispatch(setMoviesList(data));
    };
    useEffect(() => {
        getData();
        dispatch(changeActiveUrl('/'));
    }, []);
    return (_jsx(Suspense, { fallback: _jsx(Loader, {}), children: dataState ? (_jsxs("div", { className: "content", children: [_jsx(MovieRandom, {}), _jsx("h3", { className: 'content__title', children: "\u0422\u043E\u043F 10 \u0444\u0438\u043B\u044C\u043C\u043E\u0432" }), _jsx(LazyMoviesListTop, { data: dataState, num: true })] }, location.key)) : (_jsx(Loader, {})) }));
};
export default MainPage;
