import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";
import { Loader } from "../Loader/Loader";
import './style.scss'

const Profile = () => {
  
  const userInfo = useSelector((state) => state.auth.userInfo);
  if(!userInfo) return <Loader />

  const nameTransform = userInfo.name.slice(0,1).toUpperCase() + userInfo.name.slice(1).toLowerCase();
  const surnameTransform = userInfo.surname.slice(0,1).toUpperCase() + userInfo.surname.slice(1).toLowerCase();


  return userInfo &&(
   <div className="profile__card">
     <div className="profile__card__inner">
      <div className="profile__card__wrapper">
        <span className="profile__card-circle">
          <span className="profile__card-circle__info">{`${userInfo.name.slice(0, 1).toUpperCase()}${userInfo.surname.slice(0, 1).toUpperCase()}`}</span>
        </span>
        <div className="profile__card__text">
          <span className="profile__card__text-abr">Имя Фамилия</span>
          <p className="profile__card__text-name">{`${nameTransform} ${surnameTransform}`}</p>
        </div>
      </div>
      <div className="profile__card__wrapper">
        <span className="profile__card-circle">
          <svg className={`profile__card-circle__icon `}>
              <use href="/icon/sprite.svg#icon-email" />
            </svg>
        </span>
        <div className="profile__card__text">
          <span className="profile__card__text-abr">Электронная почта</span>
          <p className="profile__card__text-name">{userInfo.email}</p>
        </div>
      </div>
    </div>
    <LogoutButton />
   </div>
  );
}

export default Profile;
