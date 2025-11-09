import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "../AuthForm/style.scss";
import { useForm } from "react-hook-form";
import { UserRegisterSchema } from "../../models/User.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useBtnChanger } from "../hooks/useBtnChanger.tsx";
import { queryClient } from "../../api/queryClient.ts";
import { registerUser } from "../../api/UserApi.ts";
import { useDispatch } from "react-redux";
import { registrationFailure, registrationSuccess } from "../../store/AuthSlice.tsx";
import { useSelector } from "react-redux";
import RegisterSuccess from "../RegisterSuccess/RegisterSuccess.tsx";
const RegisterForm = () => {
    const { btnText, setBtnText } = useBtnChanger("Создать аккаунт");
    const isRegistration = useSelector((state) => state.auth.isRegistration);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm({
        resolver: zodResolver(UserRegisterSchema),
    });
    const registerMutation = useMutation({
        mutationFn: registerUser,
        onMutate() {
            setBtnText("Регистрация..");
        },
        onSuccess() {
            dispatch(registrationSuccess());
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
    return isRegistration ? (_jsx(RegisterSuccess, {})) : (_jsxs(_Fragment, { children: [_jsxs("form", { className: "form__wrapper", onSubmit: handleSubmit((data) => {
                    registerMutation.mutate(data);
                }), children: [_jsx("h4", { className: "form__title", children: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F" }), registerMutation.error && (_jsx("div", { className: "form__text-error", style: { textAlign: "center" }, children: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442" })), _jsx("div", { className: `form__input_wrapper form__input_wrapper-email ${errors.email ? `form__input_error` : ""}`, children: _jsx("input", Object.assign({ className: `form__input`, type: "text", placeholder: `${errors.email ? `sample@domain.ru` : `Электронная почта`}` }, register("email", { required: true }), { onChange: handleResetError })) }), errors.email && (_jsx("div", { className: "form__text-error", children: errors.email.message })), _jsx("div", { className: `form__input_wrapper form__input_wrapper-man ${errors.name ? `form__input_error` : ``}`, children: _jsx("input", Object.assign({ className: `form__input`, type: "text", placeholder: "\u0418\u043C\u044F" }, register("name", { required: true }), { onChange: handleResetError })) }), errors.name && (_jsx("div", { className: "form__text-error", children: errors.name.message })), _jsx("div", { className: `form__input_wrapper form__input_wrapper-man ${errors.surname ? `form__input_error` : ``}`, children: _jsx("input", Object.assign({ className: `form__input`, type: "text", placeholder: "\u0424\u0430\u043C\u0438\u043B\u0438\u044F" }, register("surname", { required: true }), { onChange: handleResetError })) }), errors.surname && (_jsx("div", { className: "form__text-error", children: errors.surname.message })), _jsx("div", { className: `form__input_wrapper form__input_wrapper-password ${errors.password ? `form__input_error` : ``}`, children: _jsx("input", Object.assign({ className: `form__input`, type: "password", placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C" }, register("password", { required: true }), { onChange: handleResetError })) }), errors.password && (_jsx("div", { className: "form__text-error", children: errors.password.message })), _jsx("div", { className: `form__input_wrapper form__input_wrapper-password ${errors.password ? `form__input_error` : ``}`, children: _jsx("input", Object.assign({ className: `form__input`, type: "password", placeholder: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C" }, register("confirmPassword", { required: true }))) }), errors.confirmPassword && (_jsx("div", { className: "form__text-error", children: errors.confirmPassword.message })), _jsxs("button", { className: `form__btn form__btn_main`, type: "submit", "aria-label": "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442", disabled: registerMutation.error ? true : false, children: [" ", btnText, " "] })] }), _jsx("button", { className: `form__btn`, onClick: () => dispatch(registrationFailure()), children: "\u0423 \u043C\u0435\u043D\u044F \u0435\u0441\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C" })] }));
};
export default RegisterForm;
