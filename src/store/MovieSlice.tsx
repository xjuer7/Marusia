import {
  createSlice,
} from "@reduxjs/toolkit";
import { GenreRequest, IMovie } from "../models/Movies.ts";

export interface MovieState {
    moviesList: null,
    moviesCard: IMovie | null,
    genreList: GenreRequest | null,
}

export interface MovieSliceState {
    data: MovieState
}


const movieSlice = createSlice({
    name: "data",
    initialState: {
        moviesList: null,
        moviesCard: null,
        genreList: null,
    },
    reducers: {
        setMoviesList(state, action) {
            state.moviesList = action.payload;
        },
        setMoviesCard(state, action) {
            state.moviesCard = action.payload;
        },
        setGenreList(state, action) {
            state.genreList = action.payload;
        },
    },
})

export const {setMoviesList, setMoviesCard, setGenreList} = movieSlice.actions;
export default movieSlice.reducer;