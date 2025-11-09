import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './style.scss';
const genreImagesUrl = {
    "action": '/img/action.webp',
    "adventure": '/img/adventure.webp',
    "history": '/img/history.webp',
    "horror": '/img/horror.webp',
    "scifi": '/img/scifi.webp',
    "stand-up": '/img/stand-up.webp',
    "fantasy": '/img/fantasy.webp',
    "drama": '/img/drama.webp',
    "mystery": '/img/mystery.webp',
    "family": '/img/family.webp',
    "comedy": '/img/comedy.webp',
    "romance": '/img/romance.webp',
    "music": '/img/music.webp',
    "crime": '/img/crime.webp',
    "tv-movie": '/img/tv-movie.webp',
    "documentary": '/img/documentary.webp',
    "thriller": '/img/thriller.webp',
    "western": '/img/western.webp',
    "animation": '/img/animation.webp',
    "war": '/img/war.webp',
};
export const GenreItems = ({ title }) => {
    const imageUrl = genreImagesUrl[title];
    return (_jsxs("div", { className: "card", children: [_jsx("img", { src: imageUrl, alt: "\u043F\u043E\u0441\u0442\u0435\u0440", className: "card_img" }), _jsx("p", { className: "card_title", children: title })] }));
};
