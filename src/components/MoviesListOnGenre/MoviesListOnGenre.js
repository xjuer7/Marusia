import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Loader } from "../Loader/Loader.tsx";
import { MoviesListItem } from "../MoviesListItem/MoviesListItem.tsx";
import './style.scss';
const MoviesListOnGenre = ({ data }) => {
    const [currentItems, setCurrentItems] = useState(data.slice(0, 10));
    const [startItem, setStartItem] = useState(10);
    const handleClick = () => {
        const nextItems = data.slice(startItem, startItem + 10);
        setCurrentItems([...currentItems, ...nextItems]);
        setStartItem(startItem + 10);
    };
    return (_jsx(_Fragment, { children: data ? (_jsxs(_Fragment, { children: [_jsx("ul", { className: `movie_list movie_list-genre`, children: currentItems.map((movie, index) => (_jsx(MoviesListItem, { movie: movie, num: false, index: index, btn: true }))) }), currentItems.length !== 50 && _jsx("button", { className: "movie_list__btn", onClick: handleClick, children: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0435\u0449\u0435" })] })) : (_jsx(Loader, {})) }));
};
export default MoviesListOnGenre;
