import ERROR_CODES from "../utils/error.js";
import { NextFunction, Response } from "express";
import ResponseHelper from "../helpers/responseHelper.js";
export const authorize = (...allowedRoles: string[]) => {
    return (req: any, res: Response, next: NextFunction) => {
        const userRole = req.token?.role;

        if (!allowedRoles.includes(userRole)) {
            return ResponseHelper.sendError(res, ERROR_CODES.AUTH_ERROR.message, ERROR_CODES.AUTH_ERROR.statusCode);
        }

        next();
    }
}