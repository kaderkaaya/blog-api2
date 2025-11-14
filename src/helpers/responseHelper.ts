import { Response } from "express";
class ResponseHelper {
    static success(res: Response, data: any, statusCode: number) {
        return res.status(statusCode).json({
            success: true,
            statusCode,
            data
        })
    };

    static sendError(res: Response, message: any, statusCode: number) {
        return res.status(statusCode).json({
            success: false,
            statusCode,
            message
        })
    };

}

export default ResponseHelper;