import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LoginForm from "../LoginForm/LoginForm.tsx";
import RegisterForm from "../RegisterForm/RegisterForm.tsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./style.scss";
const AuthForm = ({ handleCloseModal }) => {
    const authType = useSelector((state) => state.auth.authType);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (_jsx("div", { className: "auth", children: _jsxs("div", { className: `auth__wrapper ${(windowHeight < 800) ? `auth__wrapper__mobile` : ''}`, children: [_jsxs("div", { className: "auth__text-overlay", children: [_jsx("img", { className: "auth__logo", src: "/icon/header-icon/vk-logo-black.png", alt: "\u043B\u043E\u0433\u043E\u0442\u0438\u043F" }), authType === "auth" ? _jsx(LoginForm, {}) : _jsx(RegisterForm, {})] }), _jsx("button", { type: "button", className: ` auth__btn`, "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043E\u043A\u043D\u043E", onClick: handleCloseModal, children: _jsx("svg", { className: "auth__btn_icon", children: _jsx("use", { href: "/icon/sprite.svg#icon-axis" }) }) })] }) }));
};
export default AuthForm;
