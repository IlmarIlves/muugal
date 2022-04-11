import { sign } from "jsonwebtoken"
import { UserEntity } from "../entities/UserEntity"

export const createAccessToken = (user: UserEntity) => {
    return sign({userId: user.id}, process.env.ACCESS_TOKEN_SECRET!, {expiresIn: "15m"},);
}

export const createRefreshToken = (user: UserEntity) => {
    return sign({userId: user.id, tokenVersion: user.tokenVersion}, process.env.REFRESH_TOKEN_SECRET!, {expiresIn: "7m"},);
}