import { validateResponse } from "./validateResponse.ts";
import { BASE_URL } from "./config.ts";
// export const getFilterMovie = async (): Promise<Movies> => {
//     const url = `${BASE_URL}/movie`;
//     const response = await fetch(url);
// 	const data = await response.json();
// 	return data;
// }
export const basicUrl = `${BASE_URL}/movie`;
export const getMovie = async (movieId) => {
    const url = `${BASE_URL}/movie/${movieId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};
export const getMoviesTOP10 = async () => {
    const url = `${BASE_URL}/movie/top10`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};
export const getMoviesGenre = async () => {
    const url = `${BASE_URL}/movie/genres`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};
export const getMovieRandom = async () => {
    const url = `${BASE_URL}/movie/random`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};
export const addFavoriteMovie = async (id) => {
    return fetch(`${BASE_URL}/favorites`, {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `id=${encodeURIComponent(id)}`,
    })
        .then(validateResponse)
        .then((response) => response.json());
    // .then((data) => {
    //     return UserSchema.parse(data);
    // })
};
export const removeFavoriteMovie = async (id) => {
    return fetch(`${BASE_URL}/favorites/${id}`, {
        credentials: "include",
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(validateResponse)
        .then(() => undefined);
};
