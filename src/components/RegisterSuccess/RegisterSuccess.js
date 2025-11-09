import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { registrationFailure } from "../../store/AuthSlice.tsx";
import "../AuthForm/style.scss";
import { useDispatch } from "react-redux";
const RegisterSuccess = () => {
    const dispatch = useDispatch();
    return (_jsxs(_Fragment, { children: [_jsx("h4", { className: "form__title", children: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430" }), _jsx("p", { className: "form__text", children: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0432\u0430\u0448\u0443 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0443\u044E \u043F\u043E\u0447\u0442\u0443 \u0434\u043B\u044F \u0432\u0445\u043E\u0434\u0430" }), _jsx("button", { className: "form__btn form__btn_main", onClick: () => dispatch(registrationFailure()), children: "\u0412\u043E\u0439\u0442\u0438" })] }));
};
export default RegisterSuccess;
