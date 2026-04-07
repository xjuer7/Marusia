
import { z } from "zod"

export const UserRegisterSchema = z.object({
    email: z.string().email('Некорретный адрес почты'),
    name: z.string().min(3, "Имя должно быть не менее 3 символов"),
    surname: z.string().min(3, "Фамилия должна быть не менее 3 символов"),
    password: z.string().min(6, 'Пароль слишком короткий'),
    confirmPassword: z.string().min(6, 'Пароль слишком короткий'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path:['confirmPassword']
});

export type UserRegister = z.infer<typeof UserRegisterSchema>


export const UserLoginSchema = z.object({
    email: z.string().min(5, 'Почта должна содержать не менее 5 символов'),
    password: z.string().min(6, 'Пароль слишком короткий'),
})
export type UserLogin = z.infer<typeof UserLoginSchema>


export const UserSchema = z.object({
    name: z.string(),
    surname: z.string(),
    email: z.string(),
    favorites: z.array(z.string()).optional(),
});
export type User = z.infer<typeof UserSchema>

