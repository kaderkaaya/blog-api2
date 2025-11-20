import { Request, Response } from "express";
import UserService from "../services/user.js";
import ResponseHelper from "../helpers/responseHelper.js";

class UserController {
    static async register(req: Request, res: Response): Promise<void> {
        try {
            const { name, mail, phoneNumber, password, role } = req.body;
            const user = await UserService.register(name, mail, phoneNumber, password, role);
            ResponseHelper.success(res, { user }, 200)
        } catch (error: any) {
            ResponseHelper.sendError(res, error.message, 500)
        }
    };

    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { phoneNumber, password } = req.body;
            const user = await UserService.login(phoneNumber, password);
            ResponseHelper.success(res, { user }, 201)
        } catch (error: any) {
            ResponseHelper.sendError(res, error.message, 500)
        }
    };

    static async getself(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.query;
            const user = await UserService.getself(userId as string);
            ResponseHelper.success(res, { user }, 200)
        } catch (error: any) {
            ResponseHelper.sendError(res, error.message, 500)
        }
    };

    static async verifyCode(req: Request, res: Response): Promise<void> {
        try {
            const { code, userId } = req.body;
            const user = await UserService.verifyCode(code, userId);
            ResponseHelper.success(res, { user }, 200)
        } catch (error: any) {
            ResponseHelper.sendError(res, error.message, 500)
        }
    };

    static async update(req: Request, res: Response): Promise<void> {
        try {
            const { userId, name, mail, phoneNumber } = req.body;
            const user = await UserService.update(userId, name, mail, phoneNumber);
            ResponseHelper.success(res, { user }, 201)
        } catch (error: any) {
            ResponseHelper.sendError(res, error.message, 500)
        }
    };

    static async logOut(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.body;
            const user = await UserService.logOut(userId);
            ResponseHelper.success(res, { user }, 200)
        } catch (error: any) {
            ResponseHelper.sendError(res, error.message, 500)
        }
    };

    static async getBlogs(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.query;
            const userBlogs = await UserService.getBlogs(userId as string);
            ResponseHelper.success(res, { userBlogs }, 200)
        } catch (error: any) {
            ResponseHelper.sendError(res, error.message, 500)
        }
    };
    

}
export default UserController;