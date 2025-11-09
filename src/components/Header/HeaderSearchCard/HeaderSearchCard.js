import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toHoursAndMinutes } from "../../MovieCardTemplate/MovieCardTemplate.tsx";
import { checkBgRating } from "../../MovieCardTemplate/MovieCardTemplate.tsx";
import './search.scss';
const HeaderSearch = ({ data }) => {
    return (_jsxs("div", { className: "header-search__container", children: [_jsx("img", { src: data.posterUrl, alt: "\u043F\u043E\u0441\u0442\u0435\u0440", className: "header-search__img" }), _jsxs("div", { className: "header-search__content", children: [_jsxs("div", { className: "header-search__text", children: [_jsxs("span", { style: { backgroundColor: checkBgRating(data.tmdbRating) }, className: "header-search__stars", children: [_jsx("img", { src: "/icon/star.svg", alt: "\u0438\u043A\u043E\u043D\u043A\u0430" }), data.tmdbRating] }), data.releaseYear && (_jsx("span", { className: "header-search__year", children: data.releaseYear })), data.genres && (_jsx("span", { className: "header-search__genre", children: data.genres.join(", ") })), _jsx("span", { className: "header-search__runtime", children: toHoursAndMinutes(data.runtime) })] }), _jsx("h4", { className: "header-search__title", children: data.title })] })] }));
};
export default HeaderSearch;
