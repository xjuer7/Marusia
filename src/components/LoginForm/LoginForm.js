import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "../AuthForm/style.scss";
import { UserLoginSchema } from "../../models/User.ts";
import { useForm } from "react-hook-form";
import { useBtnChanger } from "../hooks/useBtnChanger.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../../store/AuthSlice.tsx";
import { queryClient } from "../../api/queryClient.ts";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/UserApi.ts";
const LoginForm = () => {
    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm({
        resolver: zodResolver(UserLoginSchema),
    });
    const { btnText, setBtnText } = useBtnChanger("Вход");
    const dispatch = useDispatch();
    const loginMutation = useMutation({
        mutationFn: async (values) => {
            const response = await login(values);
            return response;
        },
        onMutate() {
            setBtnText("Выполняется вход..");
        },
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            queryClient.refetchQueries({ queryKey: ['profile'] });
            dispatch(loginSuccess(data));
        },
        onError() {
            setBtnText("Попробовать снова");
        },
    }, queryClient);
    const handleResetError = (event) => {
        const fieldName = event.target.name;
        if (errors[fieldName]) {
            clearErrors(fieldName);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("form", { className: "form__wrapper", onSubmit: handleSubmit((data) => {
                    loginMutation.mutate(data);
                }), children: [loginMutation.error && (_jsx("div", { className: "form__text-error", style: { textAlign: "center" }, children: "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C" })), _jsx("div", { className: `form__input_wrapper form__input_wrapper-email ${errors.email ? `form__input_error` : ""}`, children: _jsx("input", Object.assign({ className: `form__input`, type: "text", placeholder: `${errors.email ? `sample@domain.ru` : `Электронная почта`}` }, register("email", { required: true }), { onChange: handleResetError })) }), errors.email && (_jsx("div", { className: "form__text-error", children: errors.email.message })), _jsx("div", { className: `form__input_wrapper form__input_wrapper-password ${errors.password ? `form__input_error` : ``}`, children: _jsx("input", Object.assign({ className: `form__input`, type: "password", placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C" }, register("password", { required: true }), { onChange: handleResetError })) }), errors.password && (_jsx("div", { className: "form__text-error", children: errors.password.message })), _jsx("button", { className: `form__btn form__btn_main`, "aria-label": "\u0412\u043E\u0439\u0442\u0438 \u0432 \u043B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442", children: btnText })] }), _jsx("button", { className: `form__btn`, onClick: () => dispatch(loginFailure()), children: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F" })] }));
};
export default LoginForm;
