import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { basicUrl } from "../../../api/MoviesApi.ts";
import { isSearchList, isButtonInp, isMobile, isWindowWidth, styleRemove, setInpValue } from "../../../store/UISlice.tsx";
import HeaderSearchList from "../HeaderSearchList/HeaderSearchList.tsx";
const HeaderInput = () => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const listRef = useRef();
    const searchListState = useSelector((state) => state.ui.searchList);
    const closeButtonState = useSelector((state) => state.ui.buttonInp);
    const vpMobileState = useSelector((state) => state.ui.vpMobile);
    const windowWidthState = useSelector((state) => state.ui.windowWidth);
    const removeSelector = useSelector((state) => state.ui.isRemove);
    const inputState = useSelector((state) => state.ui.inpValue);
    const [searchData, setSearchData] = useState(null);
    const sendData = async (value) => {
        fetch(`${basicUrl}?title=${value}`)
            .then((response) => response.json())
            .then((json) => json.slice(0, 5))
            .then((data) => setSearchData(data));
        dispatch(isSearchList(true));
    };
    const handleOutsideClick = (e) => {
        var _a;
        if (windowWidthState > 1023) {
            if (e.target instanceof HTMLElement && e.target.offsetParent !== listRef.current)
                closeList();
        }
        else {
            if (!(e.target instanceof HTMLElement) || !((_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)))
                closeList();
        }
    };
    const handleMobileClick = () => {
        dispatch(isMobile(true));
        dispatch(isButtonInp(true));
    };
    const handleSearchTitle = (value) => {
        dispatch(setInpValue(value));
        value ? sendData(value) : dispatch(isSearchList(false));
    };
    const closeList = () => {
        dispatch(styleRemove(true));
        dispatch(setInpValue(''));
        setTimeout(() => {
            dispatch(isMobile(false));
            dispatch(isSearchList(false));
            dispatch(styleRemove(false));
        }, 400);
    };
    useEffect(() => {
        const handleResize = () => {
            dispatch(isWindowWidth(window.innerWidth));
        };
        window.addEventListener('resize', handleResize);
        document.body.addEventListener("click", handleOutsideClick);
        return () => {
            document.body.removeEventListener("click", handleOutsideClick);
            window.removeEventListener('resize', handleResize);
        };
    }, [vpMobileState]);
    return (_jsxs("div", { className: `header__input_wrap ${removeSelector ? 'close' : ''} ${vpMobileState ? 'header__wrap-mobile' : ''}`, children: [_jsx("svg", { className: `header__icon_inp`, children: _jsx("use", { href: "/icon/sprite.svg#icon-loop" }) }), _jsx("input", { ref: inputRef, type: "text", className: `header__input`, placeholder: "\u041F\u043E\u0438\u0441\u043A", value: inputState, onChange: (e) => handleSearchTitle(e.target.value), onClick: windowWidthState < 1023 ? handleMobileClick : undefined }), _jsx("button", { onClick: () => { closeList(); dispatch(setInpValue('')); }, className: `header__btn_inp ${removeSelector ? 'header__btn_inp-close' : ''}` }), searchListState && _jsx(HeaderSearchList, { data: searchData, listRef: listRef, closeList: closeList })] }));
};
export default HeaderInput;
