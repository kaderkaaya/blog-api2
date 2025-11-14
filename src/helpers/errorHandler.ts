import { ErrorRequestHandler, NextFunction, Response, Request } from "express";
import ResponseHelper from "./responseHelper.js";
import ApiError from "./apiError.js";

const errorHandler: ErrorRequestHandler = (
    // simdi burda TS fonksiyonu error handler olarak algilamadigi icin yani middleware olarak 
    //algilamasi icin ErrorRequestHandler bunu ekliyoruz.
    //PathParams olarak algilar
    // error handlerde parametreleri err,req,res,next seklinde gondermezsek yine hata akliyoruz
    //bu kisma yeni hatalar eklenebilir validation error gibi..
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof ApiError) {
        return ResponseHelper.sendError(res, error.message, error.statusCode)
    }
    if (error.name === 'TokenExpiredError') {
        return ResponseHelper.sendError(res, 'Token Error', 401)
    }
    return ResponseHelper.sendError(res, 'Server Error', 500)
};
export default errorHandler;