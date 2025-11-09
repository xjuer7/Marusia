import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Api from "../../api/api.ts";
import { GenreItems } from "../../components/GenreItems/GenreItems.tsx";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Loader } from "../../components/Loader/Loader.tsx";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveUrl } from "../../store/UISlice.tsx";
import { setGenreList } from "../../store/MovieSlice.tsx";
import "../../base.scss";
import "./style.scss";
const GenrePage = () => {
    const dispatch = useDispatch();
    const genreState = useSelector((state) => state.data.genreList);
    const getGenres = async () => {
        const data = await Api.getMoviesGenre();
        dispatch(setGenreList(data));
    };
    useEffect(() => {
        getGenres();
        dispatch(changeActiveUrl('/genre'));
    }, []);
    if (!genreState) {
        return _jsx(Loader, {});
    }
    return (_jsxs("div", { className: "content", children: [_jsx("h2", { className: "content__title", children: "\u0416\u0430\u043D\u0440\u044B \u0444\u0438\u043B\u044C\u043C\u043E\u0432" }), _jsx("ul", { className: "genre_list", children: genreState.map((genre, index) => (_jsx("li", { className: "genre_item", children: _jsx(Link, { to: `/movie?genre=${genre}`, children: _jsx(GenreItems, { title: genre }) }) }, index + 1))) })] }));
};
export default GenrePage;
