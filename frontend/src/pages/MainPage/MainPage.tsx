
import { useEffect, lazy } from "react";
import MovieRandom from "../../components/MovieRandom/MovieRandom.tsx"
import { useDispatch } from "react-redux";
import { changeActiveUrl } from "../../store/UISlice.tsx";
// import { useLocation } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader.tsx";
import { Suspense } from "react";
import '../../base.scss'

const LazyMoviesListTop10 = lazy(() => import("../../components/MoviesListSecondary/MoviesListSecondary.tsx"))

const MainPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(changeActiveUrl('/'))
    }, [])


    return (
      <div className="content">
        <MovieRandom />

        <Suspense fallback={<Loader />}>
          <h3 className="content__title">Топ 10 фильмов</h3>
          <LazyMoviesListTop10 num={true} />
        </Suspense>
      </div>
    );
}

export default MainPage