import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton.tsx";
import { Loader } from "../Loader/Loader.tsx";
import { AuthInitialState } from "../../store/AuthSlice.tsx";
import './style.scss'

const Profile = () => {
  
  const userInfo = useSelector((state:AuthInitialState) => state.auth.userInfo);
  if(!userInfo) return <Loader />

  const nameTransform = userInfo.name ? userInfo.name.slice(0,1).toUpperCase() + userInfo.name.slice(1).toLowerCase() : '';
  const surnameTransform =userInfo.surname ?  userInfo.surname.slice(0,1).toUpperCase() + userInfo.surname.slice(1).toLowerCase() : '';
  const fullNameInitials = `${userInfo.name?.slice(0, 1)?.toUpperCase()}${userInfo.surname?.slice(0, 1)?.toUpperCase()}`;


  return userInfo &&(
   <div className="profile__card">
     <div className="profile__card__inner">
      <div className="profile__card__wrapper">
        <span className="profile__card-circle">
          <span className="profile__card-circle__info">{fullNameInitials}</span>
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
