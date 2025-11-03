import {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Profile from "../../components/Profile/Profile";
import MovieListFiltered from "../../components/Profile/MovieListFiltered";
import { useDispatch } from "react-redux";
import { changeActiveUrl } from "../../store/UISlice";

import './style.scss'


const ProfilePage = () => {
    const [param, setParam] = useState('account')
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.auth.userInfo);

    useEffect(() => {
      dispatch(changeActiveUrl('/profile')) 

      const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
    }, [])

    return (
        <>
        {userInfo ? (
        <div className="content">
        <h1 className='profile__title'>Мой аккаунт</h1>
        <div className={`profile__selector ${param === 'favorite' ? `profile__selector-favorite` : ``}`}>
            <button className={`profile__btn ${param === 'favorite' ? 'profile__btn-active' : ''}`} onClick={() => setParam('favorite')}>
                <svg
          className={`profile__btn-icon`}
        >
          <use href="/icon/sprite.svg#icon-like" />
        </svg>
        {windowWidth > 650 ? `Избранные фильмы`: `Избранное`}</button>
            <button className={`profile__btn ${param === 'account' ? 'profile__btn-active' : ''}`} onClick={() => {
                setParam('account');
            }}>
                <svg
          className={`profile__btn-icon`}
        >
          <use href="/icon/sprite.svg#icon-man" />
        </svg>
        {windowWidth > 650 ? ` Настройка аккаунта`: `Настройки`}
        </button>
        </div>
        {param == 'account' ? <Profile /> :  <MovieListFiltered arrMovie={userInfo.favorites}/>}
       
        </div>
        
    ) : (<div>Пожалуйста, авторизуйтесь</div>)}</>
    )
}

export default ProfilePage