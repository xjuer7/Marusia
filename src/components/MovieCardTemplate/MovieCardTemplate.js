import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import MovieBtnGroup from "../MovieRandom/MovieBtnGroup.tsx";
import "./style.scss";
// import "../../base.scss";
const MovieCardTemplate = ({ data, mainPage, onChange }) => {
    return (_jsx(_Fragment, { children: data ? (_jsxs("div", { className: "movie", children: [_jsxs("div", { className: "movie__info", children: [_jsxs("div", { className: "movie__details", children: [_jsxs("div", { className: "movie__text", children: [_jsxs("span", { style: { backgroundColor: checkBgRating(data.tmdbRating) }, className: "movie__stars", children: [_jsx("img", { src: "/icon/star.svg", alt: "\u0438\u043A\u043E\u043D\u043A\u0430" }), data.tmdbRating] }), data.releaseYear && (_jsx("span", { className: "movie__year", children: data.releaseYear })), data.genres && (_jsx("span", { className: "movie__genre", children: data.genres.join(", ") })), _jsx("span", { className: "movie__runtime", children: toHoursAndMinutes(data.runtime) })] }), _jsx("h1", { className: "movie__title", children: data.title }), _jsx("p", { className: "movie__descr", children: data.plot })] }), _jsx(MovieBtnGroup, { data: data, mainPage: mainPage, onChange: onChange })] }), data.posterUrl ? (_jsx("div", { className: "movie__poster", children: _jsx("img", { className: "movie__poster-img", src: data.posterUrl, alt: `Постер к фильму ${data.title}` }) })) : (_jsx("div", { className: "movie__poster_none", children: "\u041F\u043E\u0441\u0442\u0435\u0440 \u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442" }))] })) : (_jsx("div", {})) }));
};
export default MovieCardTemplate;
export const toHoursAndMinutes = (time) => {
    const hours = Math.floor(time / 60);
    const min = time % 60;
    if (hours === 0) {
        return `${time} min`;
    }
    const hoursEnds = hours > 1 ? `${hours} hours` : `${hours} hour`;
    if (min === 0) {
        return hoursEnds;
    }
    return `${hoursEnds} ${min} min`;
};
export const checkBgRating = (rating) => {
    if (rating >= 8.6) {
        return "#A59400";
    }
    else if (rating >= 7.5) {
        return "#308e21";
    }
    else if (rating >= 6.3) {
        return "#747474";
    }
    else {
        return "#C82020";
    }
};
