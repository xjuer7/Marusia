import { registrationFailure } from "../../store/AuthSlice";
import "../AuthForm/style.scss";
import {  useDispatch} from "react-redux";

const RegisterSuccess = () => {
    const dispatch = useDispatch()

    return (
         <>
        <h4 className="form__title">Регистрация завершена</h4>
        <p className="form__text">Используйте вашу электронную почту для входа</p>
        <button className="form__btn form__btn_main" onClick={() => dispatch(registrationFailure())}>Войти</button>
        </>
    )
}

export default RegisterSuccess