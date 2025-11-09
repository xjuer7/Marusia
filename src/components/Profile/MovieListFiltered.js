import { jsx as _jsx } from "react/jsx-runtime";
import Api from "../../api/api.ts";
import { MoviesListItem } from "../MoviesListItem/MoviesListItem.tsx";
import { useEffect, useState } from "react";
import '../MoviesListTop/MoviesListTop/style.scss';
const MovieListFiltered = ({ arrMovie }) => {
    const [data, setData] = useState(null);
    const getData = async (id) => {
        const data = await Api.getMovie(id);
        return data;
    };
    if (arrMovie.length > 0) {
        useEffect(() => {
            Promise.all(arrMovie.map(getData)).then((res) => setData(res));
        }, [arrMovie]);
    }
    else {
        return _jsx("p", { children: "\u0421\u043F\u0438\u0441\u043E\u043A \u043F\u0443\u0441\u0442" });
    }
    return data && (_jsx("div", { className: "movies", children: _jsx("ul", { className: `movie_list`, children: data.map((movie, index) => (_jsx(MoviesListItem, { movie: movie, num: false, index: index, btn: true }, movie.id))) }) }));
};
export default MovieListFiltered;
