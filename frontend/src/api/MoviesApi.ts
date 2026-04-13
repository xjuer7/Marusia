import { Genres, Movie, Movies } from "../models/Movies.ts";
import { validateResponse } from "./validateResponse.ts";
import { MOVIES_URL, BASE_URL, defaultConfig } from "./config.ts";
import { User } from "../models/User.ts";

export const basicMovieUrl = MOVIES_URL;

export const getMovie = async ( movieId: string | undefined): Promise<Movie> => {
    const url = `${basicMovieUrl}/v1.4/movie/${movieId}`;
    const response = await fetch(url, defaultConfig);
	const data = await response.json();
	return data;
}
export const getMoviesTOP10 = async (): Promise<Movies> => {
    const url = `${MOVIES_URL}/v1.4/movie?lists=${encodeURI("top250")}&page=2`;
    const response = await fetch(url, defaultConfig);
	const data = await response.json();
	return data.docs;
}

export const getAllMovies = async (): Promise<Movies> => {
    const url = `${MOVIES_URL}/v1.5/movie`;
    const response = await fetch(url, defaultConfig);
	const data = await response.json();
	return data;
}

export const getNextMovies = async (path:string): Promise<Movies> => {
    const url = `${MOVIES_URL}/v1.5/movie?next=${path}`;
    const response = await fetch(url, defaultConfig);
	const data = await response.json();
	return data;
}

export const getMovieRandom = async (): Promise<Movie> => {
    const url = `${MOVIES_URL}/v1.4/movie/random`;
    const response = await fetch(url, defaultConfig);
	const data = await response.json();
	return data;
}

export const getMovieOnGenre = async (genre:Genres, page = "1") => {
    const url = `${MOVIES_URL}/v1.4/movie?genres.name=${encodeURIComponent(genre)}&page=${page}`;
    const response = await fetch(url, defaultConfig);
	const data = await response.json();
	return data;
}

export const addFavoriteMovie = async ( id:number) => {
    return fetch(`${BASE_URL}/favorite`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem('data')}`
            },
            body: JSON.stringify({ id }),
        })
        .then(validateResponse)
        .then((response) => response.json())
        .catch(() => new Error('Не удалось добавить в избранное'))
}

export const removeFavoriteMovie = async ( id:number) => {
    return fetch(`${BASE_URL}/favorite/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(validateResponse)
        .then((response) => response.json())
        .catch(() => new Error('Не удалось удалить из избранного'))
}
