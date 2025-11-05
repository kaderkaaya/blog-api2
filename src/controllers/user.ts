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
    }

}
export default UserController;