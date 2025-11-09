import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import './base.scss';
const LazyHomePage = lazy(() => import("./pages/MainPage/MainPage.tsx"));
const LazyGenresPage = lazy(() => import('./pages/GenresPage/GenresPage.tsx'));
const LazyMovieList = lazy(() => import('../src/components/MoviesFilteredGenre/MoviesFilteredGenre.tsx'));
const LazyMovieCard = lazy(() => import('../src/components/MovieCard/MovieCard.tsx'));
const LazyProfilePage = lazy(() => import('../src/pages/ProfilePage/ProfilePage.tsx'));
export function App() {
    return (_jsxs(BrowserRouter, { children: [_jsx(Header, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LazyHomePage, {}) }), _jsx(Route, { path: "/profile", element: _jsx(LazyProfilePage, {}) }), _jsx(Route, { path: "/genre", element: _jsx(LazyGenresPage, {}) }), _jsx(Route, { path: "/movie", element: _jsx(LazyMovieList, {}) }), _jsx(Route, { path: "/movie/:movieId", element: _jsx(LazyMovieCard, {}) })] }), _jsx(Footer, {})] }));
}
