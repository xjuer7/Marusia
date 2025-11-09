
import LoginForm from "../LoginForm/LoginForm.tsx";
import RegisterForm from "../RegisterForm/RegisterForm.tsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthInitialState } from "../../store/AuthSlice.tsx";
import "./style.scss";


const AuthForm = ({ handleCloseModal }: { handleCloseModal: () => void }) => {
  const authType = useSelector((state:AuthInitialState) => state.auth.authType)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);


  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  },[])

  
  return (
    <div className="auth">
      <div className={`auth__wrapper ${(windowHeight < 800) ? `auth__wrapper__mobile` : ''}`}>
        <div className="auth__text-overlay">
          <img className="auth__logo" src="/icon/header-icon/vk-logo-black.png" alt="логотип" />
          {authType === "auth" ?  <LoginForm /> : <RegisterForm/>}
        </div>
        <button
          type="button"
          className={` auth__btn`}
          aria-label="Закрыть окно"
          onClick={handleCloseModal}
        >
          <svg className="auth__btn_icon">
              <use href="/icon/sprite.svg#icon-axis" />
            </svg>
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
