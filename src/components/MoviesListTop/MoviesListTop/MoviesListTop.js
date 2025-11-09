import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { MoviesListItem } from "../../MoviesListItem/MoviesListItem.tsx";
import './style.scss';
const MoviesListTop = ({ data, num }) => {
    return (_jsx(_Fragment, { children: data ? (_jsx("div", { className: "movies", children: _jsx("ul", { className: `movie_list`, children: data.map((movie, index) => (_jsx(MoviesListItem, { movie: movie, num: num, index: index, btn: false }))) }) })) : (_jsx("div", { children: "\u0421\u043F\u0438\u0441\u043E\u043A \u043F\u043E\u043A\u0430 \u043F\u0443\u0441\u0442" })) }));
};
export default MoviesListTop;
