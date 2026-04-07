import Api from "../../api/api.ts";
import { useEffect, lazy } from "react";
import MovieRandom from "../../components/MovieRandom/MovieRandom.tsx"
import { useDispatch, useSelector } from "react-redux";
import { changeActiveUrl } from "../../store/UISlice.tsx";
import { useLocation } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader.tsx";
import { Suspense } from "react";
import { setMoviesList } from "../../store/MovieSlice.tsx";
import { MovieSliceState } from "../../store/MovieSlice.tsx";
import '../../base.scss'

const LazyMoviesListTop = lazy(() => import("../../components/MoviesListTop/MoviesListTop/MoviesListTop.tsx"))


const MainPage = () => {

    const location = useLocation()
    const dispatch = useDispatch()
    const dataState = useSelector((state:MovieSliceState) => state.data.moviesList)
    
    const getData = async (): Promise<void> => {
        const data = await Api.getMoviesTOP10();
        dispatch(setMoviesList(data))
      };
    
      useEffect(() => {
        getData();
        dispatch(changeActiveUrl('/'))
      }, [])


    return (
        <Suspense fallback={<Loader />}>
        {dataState ? (
          <div className="content" key={location.key}>
            <MovieRandom/>
            <h3 className='content__title'>Топ 10 фильмов</h3>
            <LazyMoviesListTop data={dataState} num={true}/>
        </div>
        ): (<Loader/>)}
        </Suspense>
    )
}

export default MainPage