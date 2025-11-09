import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Profile from "../../components/Profile/Profile.tsx";
import MovieListFiltered from "../../components/Profile/MovieListFiltered.tsx";
import { useDispatch } from "react-redux";
import { changeActiveUrl } from "../../store/UISlice.tsx";
import './style.scss';
const ProfilePage = () => {
    const [param, setParam] = useState('account');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.auth.userInfo);
    useEffect(() => {
        dispatch(changeActiveUrl('/profile'));
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (_jsx(_Fragment, { children: userInfo ? (_jsxs("div", { className: "content", children: [_jsx("h1", { className: 'profile__title', children: "\u041C\u043E\u0439 \u0430\u043A\u043A\u0430\u0443\u043D\u0442" }), _jsxs("div", { className: `profile__selector ${param === 'favorite' ? `profile__selector-favorite` : ``}`, children: [_jsxs("button", { className: `profile__btn ${param === 'favorite' ? 'profile__btn-active' : ''}`, onClick: () => setParam('favorite'), children: [_jsx("svg", { className: `profile__btn-icon`, children: _jsx("use", { href: "/icon/sprite.svg#icon-like" }) }), windowWidth > 650 ? `Избранные фильмы` : `Избранное`] }), _jsxs("button", { className: `profile__btn ${param === 'account' ? 'profile__btn-active' : ''}`, onClick: () => {
                                setParam('account');
                            }, children: [_jsx("svg", { className: `profile__btn-icon`, children: _jsx("use", { href: "/icon/sprite.svg#icon-man" }) }), windowWidth > 650 ? ` Настройка аккаунта` : `Настройки`] })] }), param == 'account' ? _jsx(Profile, {}) : _jsx(MovieListFiltered, { arrMovie: userInfo.favorites || [] })] })) : (_jsx("div", { children: "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0443\u0439\u0442\u0435\u0441\u044C" })) }));
};
export default ProfilePage;
