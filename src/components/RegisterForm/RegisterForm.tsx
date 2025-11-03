
import "../AuthForm/style.scss";
import { useForm } from "react-hook-form";
import { UserRegister, UserRegisterSchema } from "../../models/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useBtnChanger } from "../hooks/useBtnChanger";
import { queryClient } from "../../api/queryClient";
import { registerUser } from "../../api/UserApi";
import { useDispatch } from "react-redux";
import { registrationFailure, registrationSuccess } from "../../store/AuthSlice";
import { useSelector } from "react-redux";
import RegisterSuccess from "../RegisterSuccess/RegisterSuccess";


const RegisterForm = () => {
  const { btnText, setBtnText } = useBtnChanger("Создать аккаунт");
  const isRegistration = useSelector(state => state.auth.isRegistration)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm<UserRegister>({
    resolver: zodResolver(UserRegisterSchema),
  });

  const registerMutation = useMutation(
    {
      mutationFn: registerUser,
      onMutate() {
        setBtnText("Регистрация..");
      },
      onSuccess() {
        dispatch(registrationSuccess())
      },
      onError() {
        setBtnText("Попробовать снова");
      },
    },
    queryClient
  );

  const handleResetError = (event) => {
    const fieldName = event.target.name;
    if (errors[fieldName]) {
      clearErrors(fieldName);
    }
  };


  return isRegistration ? (
   <RegisterSuccess />
  ) : (
    <>
    <form
      className="form__wrapper"
      onSubmit={handleSubmit((data: UserRegister) => {
        registerMutation.mutate(data);
      })}
    >
      <h4 className="form__title">Регистрация</h4>

      {registerMutation.error && (
        <div className="form__text-error" style={{textAlign: "center"}}>Пользователь уже существует</div>
      )}

      <div className={`form__input_wrapper form__input_wrapper-email ${errors.email ? `form__input_error` : ""}`}>
        <input className={`form__input`} type="text" placeholder={`${errors.email ? `sample@domain.ru` : `Электронная почта` }`}
          {...register("email", { required: true })}
          onChange={handleResetError}
        />
      </div>
      {errors.email && ( <div className="form__text-error">{errors.email.message}</div>)}
      <div className={`form__input_wrapper form__input_wrapper-man ${ errors.name ? `form__input_error` : ``}`} >
        <input className={`form__input`} type="text" placeholder="Имя"
          {...register("name", { required: true })}
          onChange={handleResetError}
        />
      </div>
      {errors.name && ( <div className="form__text-error">{errors.name.message}</div>)}
      <div className={`form__input_wrapper form__input_wrapper-man ${ errors.surname ? `form__input_error` : `` }`} >
        <input className={`form__input`} type="text" placeholder="Фамилия"
          {...register("surname", { required: true })}
          onChange={handleResetError}
        />
      </div>
      {errors.surname && ( <div className="form__text-error">{errors.surname.message}</div>)}
      <div className={`form__input_wrapper form__input_wrapper-password ${ errors.password ? `form__input_error` : `` }`} >
        <input className={`form__input`} type="password" placeholder="Пароль"
          {...register("password", { required: true })}
          onChange={handleResetError}
        />
      </div>
      {errors.password && ( <div className="form__text-error">{errors.password.message}</div>)}
      <div className={`form__input_wrapper form__input_wrapper-password ${ errors.password ? `form__input_error` : `` }`} >
        <input className={`form__input`} type="password" placeholder="Подтвердите пароль"
          {...register("confirmPassword", { required: true })}/>
      </div>
      {errors.confirmPassword && (
        <div className="form__text-error">{errors.confirmPassword.message}</div>
      )}

      <button className={`form__btn form__btn_main`} type="submit" aria-label="Создать аккаунт" disabled={registerMutation.error ? true : false} > {btnText} </button>
    </form>
     <button className={`form__btn`} onClick={() => dispatch(registrationFailure())}>У меня есть пароль</button>
    </>
  );
};

export default RegisterForm;
