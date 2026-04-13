import Api from "../../api/api.ts";
// import { useEffect} from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { MovieSliceState, setMoviesRandomCard } from "../../store/MovieSlice.tsx";
import MovieCardTemplate from "../MovieCardTemplate/MovieCardTemplate.tsx";
import LoaderRandomMovie from '../LoaderRandomMovie/LoaderRandomMovie.jsx'
import "../MovieCardTemplate/style.scss";
import { useQuery } from "@tanstack/react-query";

const MovieRandom = () => {
  const { data, isPending, isError, refetch} = useQuery({
    queryKey: ['random-movie'],
    queryFn: () => Api.getMovieRandom(),
    retry: false,
    refetchOnWindowFocus: false,
  })

  const handleChangeFilm = () => {
    refetch()
  };

  return (
    <>
    {isPending && <LoaderRandomMovie/>}
    {isError && <>Не удалось получить рандом, повторить попытку?</>}
    {data && !isPending && (
       <MovieCardTemplate
          data={data}
          mainPage={true}
          onChange={handleChangeFilm}
        />
    )}

    </>
  );
};

export default MovieRandom;


