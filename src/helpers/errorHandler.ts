import { Response } from "express";
import ResponseHelper from "./responseHelper.js";
import ApiError from "./apiError.js";

export default function errorHandler(res: Response, error: any) {
    if (error instanceof ApiError) {
        return ResponseHelper.sendError(res, error.message, error.statusCode)
    }
    if (error.name === 'TokenExpiredError') {
        return ResponseHelper.sendError(res, 'Token Error', 401)
    }
    return ResponseHelper.sendError(res, 'Server Error', 500)
}