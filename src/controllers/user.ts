import { Request, Response } from "express";
import UserService from "../services/user.js";

class UserController {
    static async register(req: Request, res: Response): Promise<void> {
        try {
            const { name, mail, phoneNumber, password } = req.body;
            const user = await UserService.register(name, mail, phoneNumber, password);
            res.status(201).json({ success: true, data: { user }, statusCode: 201 });
        } catch (error) {
            res.status(500).send({ success: false, error: `${error}`, statusCode: 500 })
        }
    };
    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { phoneNumber, password } = req.body;
            const user = await UserService.login(phoneNumber, password);
            res.status(201).json({ success: true, data: { user }, statusCode: 201 });
        } catch (error) {
            res.status(500).send({ success: false, error: `${error}`, statusCode: 500 })
        }
    };
    static async getMe(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.query;
            if (typeof userId !== "string") {
                res.status(400).json({ success: false, message: "userId is required", statusCode: 400 });
                return;
            }
            const user = await UserService.getMe(userId);
            res.status(201).json({ success: true, data: { user }, statusCode: 200 });
        } catch (error) {
            res.status(500).send({ success: false, error: `${error}`, statusCode: 500 })
        }
    };
    // static async update(req: Request, res: Response): Promise<void> {
    //     try {
    //         const { userId, name, mail, phoneNumber } = req.body;
    //         const user = await UserService.update(userId, name, mail, phoneNumber);
    //         res.status(201).json({ success: true, data: { user }, statusCode: 201 });
    //     } catch (error) {
    //         res.status(500).send({ success: false, error: `${error}`, statusCode: 500 })
    //     }
    // };

    // static async logOut(req: Request, res: Response): Promise<void> {
    //     try {
    //         const { userId } = req.body;
    //         const user = await UserService.logOut(userId);
    //         res.status(201).json({ success: true, data: { user }, statusCode: 201 });
    //     } catch (error) {
    //         res.status(500).send({ success: false, error: `${error}`, statusCode: 500 })
    //     }
    // };


}
export default UserController;