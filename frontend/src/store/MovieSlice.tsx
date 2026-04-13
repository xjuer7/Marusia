import {
  createSlice,
} from "@reduxjs/toolkit";
import { Genres, Movie } from "../models/Movies.ts";

export interface MovieState {
    moviesList: Movie[] | null,
    moviesFullCard: Movie | null,
    moviesTop10: Movie[] | null,
    genreList: Genres | null,
}

export interface MovieSliceState {
    data: MovieState
}

const movieSlice = createSlice({
    name: "data",
    initialState: {
        moviesList: null,
        moviesFullCard: null,
        moviesTop10: null,
        genreList: null,
    },
    reducers: {
        setMoviesList(state, action) {
            state.moviesList = action.payload;
        },
        setMoviesTop10(state, action) {
            state.moviesTop10 = action.payload;
        },
        setMoviesFullCard(state, action) {
            state.moviesFullCard = action.payload;
        },
        setGenreList(state, action) {
            state.genreList = action.payload;
        },
    },
})

export const {setMoviesList, setMoviesTop10, setMoviesFullCard, setGenreList} = movieSlice.actions;
export default movieSlice.reducer;