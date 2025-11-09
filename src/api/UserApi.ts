import { validateResponse } from "./validateResponse.ts";
import { UserLogin, UserRegister, User, UserSchema } from "../models/User.ts";
import { BASE_URL } from "./config.ts";

export async function login(data: UserLogin): Promise<void> {
    return fetch(`${BASE_URL}/auth/login` , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
    })
    .then(validateResponse)
    // .then(() => localStorage.setItem('user', JSON.stringify(data)))
    .then(() => undefined)
}

export async function registerUser(data: UserRegister): Promise<void>  {
    return fetch(`${BASE_URL}/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
    })
    .then(validateResponse)
    .then(() => undefined)
}

export async function getProfileUser(): Promise<User> {
    return fetch(`${BASE_URL}/profile`, {
        credentials: "include",
    })
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => {
        return UserSchema.parse(data)
    })
}

export async function logoutUser(): Promise<void> {
    return fetch(`${BASE_URL}/auth/logout`, {
        credentials: "include",
    })
    .then(validateResponse)
    .then((response) => response.json())
}


