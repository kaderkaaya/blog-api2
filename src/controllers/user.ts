import { Request, Response } from "express";
import UserService from "../services/user.js";

class UserController {
    static async register(req: Request, res: Response): Promise<void> {
        try {
            const { name, mail, phoneNumber, password } = req.body;
            const user = await UserService.register(name, mail, phoneNumber, password );
            res.status(201).send(`User created successfullyyyy ${user}`);
        } catch (error) {
            res.status(500).send({ error: `${error}` })
        }
    }

}
export default UserController;