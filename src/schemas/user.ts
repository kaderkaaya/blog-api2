import { z } from "zod";

export const register = z.object({
    name: z.string(),
    mail: z.string(),
    phoneNumber: z.string(),
    password: z.string(),
});

export const login = z.object({
    phoneNumber: z.string(),
    password: z.string(),
});

export const verifyCode = z.object({
    userId: z.string(),
    code: z.string(),
});

export const getMe = z.object({
    userId: z.string(),
});

export const update = z.object({
    userId: z.string(),
    name: z.string(),
    mail: z.string(),
    phoneNumber: z.string(),
});

export const logOut = z.object({
    userId: z.string(),
});

export default {
    register,
    login,
    verifyCode,
    getMe,
    update,
    logOut
}