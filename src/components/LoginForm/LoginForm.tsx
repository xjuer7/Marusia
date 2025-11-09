import "../AuthForm/style.scss";
import { UserLogin, UserLoginSchema } from "../../models/User.ts";
import { useForm } from "react-hook-form";
import { useBtnChanger } from "../hooks/useBtnChanger.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../../store/AuthSlice.tsx";
import { queryClient } from "../../api/queryClient.ts";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/UserApi.ts";
import { ChangeEvent } from "react";


const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm<UserLogin>({
    resolver: zodResolver(UserLoginSchema),
  });
  const { btnText, setBtnText } = useBtnChanger("Вход");
  const dispatch = useDispatch();

  const loginMutation = useMutation(
    {
      mutationFn: async (values: UserLogin) => {
        const response = await login(values);
        return response
      },
      onMutate() {
        setBtnText("Выполняется вход..");
      },
      onSuccess(data) {
        queryClient.invalidateQueries({ queryKey: ['profile'] });
        queryClient.refetchQueries({ queryKey: ['profile'] });
        dispatch(loginSuccess(data))
      },
      onError() {
        setBtnText("Попробовать снова");
      },
    },
    queryClient
  );

  const handleResetError = (event:ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name as keyof UserLogin;
    if (errors[fieldName]) {
      clearErrors(fieldName)
    }
  };

  return (
    <>
      <form className="form__wrapper" onSubmit={handleSubmit((data: UserLogin) => {
          loginMutation.mutate(data);
        })}>
        {loginMutation.error && ( 
          <div className="form__text-error" style={{textAlign: "center"}}>Неверный логин или пароль</div> 
        )}
        <div className={`form__input_wrapper form__input_wrapper-email ${ errors.email ? `form__input_error` : "" }`} >
          <input className={`form__input`} type="text" placeholder={`${ errors.email ? `sample@domain.ru` : `Электронная почта` }`}
          {...register("email", { required: true })}
          onChange={handleResetError} />
        </div>
        {errors.email && (<div className="form__text-error">{errors.email.message}</div>)}
  
        <div className={`form__input_wrapper form__input_wrapper-password ${ errors.password ? `form__input_error` : `` }`}>
          <input className={`form__input`} type="password" placeholder="Пароль"
            {...register("password", { required: true })} onChange={handleResetError} /> 
          </div>
        {errors.password && (<div className="form__text-error">{errors.password.message}</div>)}

        <button className={`form__btn form__btn_main`} aria-label="Войти в личный кабинет">
          {btnText}
        </button>
      </form>
      <button className={`form__btn`} onClick={() => dispatch(loginFailure())}>
        Регистрация
      </button>
    </>
  );
};

export default LoginForm;
