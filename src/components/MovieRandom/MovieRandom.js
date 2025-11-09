import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import Api from "../../api/api.ts";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMoviesCard } from "../../store/MovieSlice.tsx";
import MovieCardTemplate from "../MovieCardTemplate/MovieCardTemplate.tsx";
import "../MovieCardTemplate/style.scss";
const MovieRandom = () => {
    const dispatch = useDispatch();
    const dataState = useSelector((state) => state.data.moviesCard);
    const getData = async () => {
        const data = await Api.getMovieRandom();
        dispatch(setMoviesCard(data));
    };
    useEffect(() => {
        getData();
    }, []);
    const handleChangeFilm = () => {
        getData();
    };
    return (_jsx(_Fragment, { children: dataState ? (_jsx(MovieCardTemplate, { data: dataState, mainPage: true, onChange: handleChangeFilm })) : (_jsx("div", {})) }));
};
export default MovieRandom;
