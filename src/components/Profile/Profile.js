import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton.tsx";
import { Loader } from "../Loader/Loader.tsx";
import './style.scss';
const Profile = () => {
    var _a, _b, _c, _d;
    const userInfo = useSelector((state) => state.auth.userInfo);
    if (!userInfo)
        return _jsx(Loader, {});
    const nameTransform = userInfo.name ? userInfo.name.slice(0, 1).toUpperCase() + userInfo.name.slice(1).toLowerCase() : '';
    const surnameTransform = userInfo.surname ? userInfo.surname.slice(0, 1).toUpperCase() + userInfo.surname.slice(1).toLowerCase() : '';
    const fullNameInitials = `${(_b = (_a = userInfo.name) === null || _a === void 0 ? void 0 : _a.slice(0, 1)) === null || _b === void 0 ? void 0 : _b.toUpperCase()}${(_d = (_c = userInfo.surname) === null || _c === void 0 ? void 0 : _c.slice(0, 1)) === null || _d === void 0 ? void 0 : _d.toUpperCase()}`;
    return userInfo && (_jsxs("div", { className: "profile__card", children: [_jsxs("div", { className: "profile__card__inner", children: [_jsxs("div", { className: "profile__card__wrapper", children: [_jsx("span", { className: "profile__card-circle", children: _jsx("span", { className: "profile__card-circle__info", children: fullNameInitials }) }), _jsxs("div", { className: "profile__card__text", children: [_jsx("span", { className: "profile__card__text-abr", children: "\u0418\u043C\u044F \u0424\u0430\u043C\u0438\u043B\u0438\u044F" }), _jsx("p", { className: "profile__card__text-name", children: `${nameTransform} ${surnameTransform}` })] })] }), _jsxs("div", { className: "profile__card__wrapper", children: [_jsx("span", { className: "profile__card-circle", children: _jsx("svg", { className: `profile__card-circle__icon `, children: _jsx("use", { href: "/icon/sprite.svg#icon-email" }) }) }), _jsxs("div", { className: "profile__card__text", children: [_jsx("span", { className: "profile__card__text-abr", children: "\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430\u044F \u043F\u043E\u0447\u0442\u0430" }), _jsx("p", { className: "profile__card__text-name", children: userInfo.email })] })] })] }), _jsx(LogoutButton, {})] }));
};
export default Profile;
