import { Routes, Route } from "react-router-dom"
import { lazy } from "react"
import { BrowserRouter } from "react-router-dom"
import Header from "./components/Header/Header.tsx"
import Footer from "./components/Footer/Footer.tsx"
import './base.scss'

const LazyHomePage = lazy(() => import("./pages/MainPage/MainPage.tsx"))
const LazyGenresPage = lazy(() => import('./pages/GenresPage/GenresPage.tsx'))
const LazyMovieList = lazy(() => import('../src/components/MoviesFilteredGenre/MoviesFilteredGenre.tsx'))
const LazyMovieCard = lazy(() => import('../src/components/MovieCard/MovieCard.tsx'))
const LazyProfilePage = lazy(() => import('../src/pages/ProfilePage/ProfilePage.tsx'))

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