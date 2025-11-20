import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import ERROR_CODES from "../utils/error.js";
import ResponseHelper from "../helpers/responseHelper.js";
const JWT_KEY = process.env.JWT_KEY;

export const authenticate = (req: any, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization?.split(" ")[1] as any;
    try {
        const decoded = jwt.verify(token, JWT_KEY!) as any;
        req.token = decoded;
        next();
    } catch (e) {
        return ResponseHelper.sendError(res, ERROR_CODES.TOKEN_ERROR.message, ERROR_CODES.TOKEN_ERROR.statusCode);
    }
};
