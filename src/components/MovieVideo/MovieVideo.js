import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ReactPlayer from 'react-player';
import { Loader } from '../Loader/Loader.tsx';
import './style.scss';
const MovieVideo = ({ videoSrc, onClick }) => {
    return (_jsx("div", { className: 'movie-video__overlay', children: _jsxs("div", { className: 'movie-video__wrapper', children: [_jsx(ReactPlayer, { src: videoSrc, className: 'movie-video__content', fallback: _jsx(Loader, {}) }), _jsx("button", { onClick: onClick, className: 'movie-video__btn' })] }) }));
};
export default MovieVideo;
