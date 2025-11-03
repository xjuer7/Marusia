import { Routes, Route } from "react-router-dom"
import { lazy } from "react"
import { BrowserRouter } from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import './base.scss'



const LazyHomePage = lazy(() => import("./pages/MainPage/MainPage"))
const LazyGenresPage = lazy(() => import('./pages/GenresPage/GenresPage'))
const LazyMovieList = lazy(() => import('../src/components/MoviesFilteredGenre/MoviesFilteredGenre'))
const LazyMovieCard = lazy(() => import('../src/components/MovieCard/MovieCard'))
const LazyProfilePage = lazy(() => import('../src/pages/ProfilePage/ProfilePage'))

export function App () {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<LazyHomePage />} />
                <Route path="/profile" element={<LazyProfilePage />} />
                <Route path="/genre" element={<LazyGenresPage />}/>
                <Route path="/movie" element={<LazyMovieList />}/>
                <Route path="/movie/:movieId" element={<LazyMovieCard/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}