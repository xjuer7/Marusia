import { validateResponse } from "./validateResponse.ts";
import { UserSchema } from "../models/User.ts";
import { BASE_URL } from "./config.ts";
export async function login(data) {
    return fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
    })
        .then(validateResponse)
        // .then(() => localStorage.setItem('user', JSON.stringify(data)))
        .then(() => undefined);
}
export async function registerUser(data) {
    return fetch(`${BASE_URL}/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
    })
        .then(validateResponse)
        .then(() => undefined);
}
export async function getProfileUser() {
    return fetch(`${BASE_URL}/profile`, {
        credentials: "include",
    })
        .then(validateResponse)
        .then((response) => response.json())
        .then((data) => {
        return UserSchema.parse(data);
    });
}
export async function logoutUser() {
    return fetch(`${BASE_URL}/auth/logout`, {
        credentials: "include",
    })
        .then(validateResponse)
        .then((response) => response.json());
}
