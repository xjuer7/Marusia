import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Account } from "../Account/Account.tsx";
import HeaderInput from "./HeaderInput/HeaderInput.tsx";
import { useSelector } from "react-redux";
import "./style.scss";
const Header = () => {
    const windowWidthState = useSelector((state) => state.ui.windowWidth);
    const pathname = useSelector((state) => state.ui.activeURL);
    return (_jsxs("header", { className: `header`, children: [_jsx(Link, { to: "/", children: _jsx("img", { src: "/icon/header-icon/vk-logo-white.png", alt: "\u041B\u043E\u0433\u043E\u0442\u0438\u043F", className: "header-logo" }) }), _jsxs("div", { className: "header_center", children: [_jsx(Link, { to: "/", className: `header_main ${windowWidthState > 600 && pathname === "/" ? `active` : ``}`, children: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F" }), _jsx(Link, { to: "/genre", className: `header_genre ${windowWidthState > 600 && pathname === "/genre" ? `active` : ``}`, children: "\u0416\u0430\u043D\u0440\u044B" }), _jsx(HeaderInput, {})] }), _jsx(Account, {})] }));
};
export default Header;
