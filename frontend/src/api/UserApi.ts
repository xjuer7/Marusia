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
    })
    .then(validateResponse)
    .then((res) => res.json())
    .then((data) => {
        sessionStorage.setItem('data', data.token)
        return data
    })
    // .then(() => undefined)
}

export async function registerUser(data: UserRegister): Promise<void>  {
    return fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(validateResponse)
    .then(() => undefined)
}


export async function getProfileUser(): Promise<User> {
    return fetch(`${BASE_URL}/auth/me`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('data')}`
        }
    })
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => data)
}

export function logoutUser(): void {
    sessionStorage.removeItem('data')
}


