import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Api from "../../api/api.ts";
import { useEffect } from "react";
import MovieCardTemplate from "../MovieCardTemplate/MovieCardTemplate.tsx";
import { setMoviesCard } from "../../store/MovieSlice.tsx";
import "./style.scss";
const MovieCard = () => {
    const dispatch = useDispatch();
    const movieState = useSelector((state) => state.data.moviesCard);
    const { movieId } = useParams();
    const getData = async (movieId) => {
        const data = await Api.getMovie(movieId);
        dispatch(setMoviesCard(data));
    };
    useEffect(() => {
        getData(movieId);
    }, [movieId]);
    return (_jsx("div", { children: movieState ? (_jsxs("div", { className: "content", children: [_jsx(MovieCardTemplate, { data: movieState, mainPage: false, onChange: undefined }), _jsxs("div", { className: "movie__parameter", children: [_jsx("h2", { className: "movie__parameter_title", children: "\u041E \u0444\u0438\u043B\u044C\u043C\u0435" }), _jsx("table", { className: "movie__parameter_table", children: _jsxs("tbody", { children: [movieState.language && (_jsxs("tr", { className: "movie__parameter_item", children: [_jsxs("td", { className: "movie__parameter_wrapper", children: [_jsx("div", { className: "movie__parameter_name", children: "\u042F\u0437\u044B\u043A \u043E\u0440\u0438\u0433\u0438\u043D\u0430\u043B\u0430" }), _jsx("div", { className: "movie__parameter_empty" })] }), _jsx("td", { children: movieState.language })] })), movieState.budget && (_jsxs("tr", { className: "movie__parameter_item", children: [_jsxs("td", { className: "movie__parameter_wrapper", children: [_jsx("div", { className: "movie__parameter_name", children: "\u0411\u044E\u0434\u0436\u0435\u0442" }), _jsx("div", { className: "movie__parameter_empty" })] }), _jsx("td", { children: movieState.budget })] })), movieState.revenue && (_jsxs("tr", { className: "movie__parameter_item", children: [_jsxs("td", { className: "movie__parameter_wrapper", children: [_jsx("div", { className: "movie__parameter_name", children: "\u0412\u044B\u0440\u0443\u0447\u043A\u0430" }), _jsx("div", { className: "movie__parameter_empty" })] }), _jsx("td", { children: movieState.revenue })] })), movieState.director && (_jsxs("tr", { className: "movie__parameter_item", children: [_jsxs("td", { className: "movie__parameter_wrapper", children: [_jsx("div", { className: "movie__parameter_name", children: "\u0420\u0435\u0436\u0438\u0441\u0441\u0451\u0440" }), _jsx("div", { className: "movie__parameter_empty" })] }), _jsx("td", { children: movieState.director })] })), movieState.production && (_jsxs("tr", { className: "movie__parameter_item", children: [_jsxs("td", { className: "movie__parameter_wrapper", children: [_jsx("div", { className: "movie__parameter_name", children: "\u041F\u0440\u043E\u0434\u0430\u043A\u0448\u0435\u043D" }), _jsx("div", { className: "movie__parameter_empty" })] }), _jsx("td", { children: movieState.production })] })), movieState.awardsSummary && (_jsxs("tr", { className: "movie__parameter_item", children: [_jsxs("td", { className: "movie__parameter_wrapper", children: [_jsx("div", { className: "movie__parameter_name", children: "\u041D\u0430\u0433\u0440\u0430\u0434\u044B" }), _jsx("div", { className: "movie__parameter_empty" })] }), _jsx("td", { children: movieState.awardsSummary })] }))] }) })] })] })) : (_jsx("div", {})) }));
};
export default MovieCard;
