import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import HeaderSearchCard from '../HeaderSearchCard/HeaderSearchCard.tsx';
import { useDispatch, useSelector } from "react-redux";
import { setInpValue } from "../../../store/UISlice.tsx";
const HeaderSearchList = ({ data, listRef, closeList }) => {
    const removeSelector = useSelector((state) => state.ui.isRemove);
    const dispatch = useDispatch();
    return (_jsx("ul", { ref: listRef, className: `header-search__list ${removeSelector ? `header-search__list-close` : ``}`, children: !data ? (_jsx("div", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..." })) : (_jsx(_Fragment, { children: (data === null || data === void 0 ? void 0 : data.length) !== 0 ? (_jsx(_Fragment, { children: data === null || data === void 0 ? void 0 : data.map((film) => (_jsx("li", { className: "header-search__list_item", children: _jsx(Link, { to: `/movie/${film.id}`, onClick: () => {
                            closeList();
                            dispatch(setInpValue(''));
                        }, children: _jsx(HeaderSearchCard, { data: film }) }) }, film.id))) })) : (_jsx("li", { className: "header-search__notice", children: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E" })) })) }));
};
export default HeaderSearchList;
