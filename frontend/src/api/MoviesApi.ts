import { Movie, Movies } from "../models/Movies.ts";
import { validateResponse } from "./validateResponse.ts";
import { MOVIES_URL, BASE_URL } from "./config.ts";
import { User } from "../models/User.ts";

export const basicMovieUrl = MOVIES_URL;

export const getMovie = async ( movieId: string | undefined): Promise<Movie> => {
    const url = `${basicMovieUrl}?${movieId}`;
    const response = await fetch(url);
	const data = await response.json();
	return data;
}
export const getMoviesTOP10 = async (): Promise<Movies> => {
    const url = `${MOVIES_URL}/movie/top10`;
    const response = await fetch(url);
	const data = await response.json();
	return data;
}

export const getMovieRandom = async (): Promise<void> => {
    const url = `${MOVIES_URL}/random`;
    const response = await fetch(url);
	const data = await response.json();
    console.log(data)
	return data.data;
}

export const addFavoriteMovie = async ( id: string) => {
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

export const removeFavoriteMovie = async ( id: string) => {
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
