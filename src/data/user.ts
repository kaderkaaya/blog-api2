import mongoose from "mongoose";
import { UserModel } from "../models/user.js";

class UserData {
    static async register(name: string, mail: string, phoneNumber: string, hashPass: string, userC: string, role: string) {
        return await UserModel.create({
            name,
            mail,
            phoneNumber,
            password: hashPass,
            code: userC,
            verifyCode: false,
            role
        })
    };

    static async getUser(mail: string, phoneNumber: string) {
        const user = await UserModel.findOne({
            phoneNumber,
            mail
        });
        return user;
    };

    static async getUserByNumber(phoneNumber: string) {
        const user = await UserModel.findOne({
            phoneNumber
        });
        return user;
    }

    static async getUserById(userId: string) {
        const userObjId = new mongoose.Types.ObjectId(userId);
        const user = await UserModel.findById({
            _id: userObjId
        });
        return user;
    };

    static async verifiedUserCode(userId: string,) {
        const user = await UserModel.findByIdAndUpdate(
            { _id: userId },
            { verifyCode: true }
        )
        return user;
    };

    static async updateUser(userId: string, name: string, mail: string, phoneNumber: string) {
        const userData: Partial<{
            name: string,
            mail: string
            phoneNumber: string
        }> = {};
        if (name) {
            userData.name = name;
        }
        if (mail) {
            userData.mail = mail;
        }
        if (phoneNumber) {
            userData.phoneNumber = phoneNumber;
        }
        return await UserModel.findByIdAndUpdate(
            { _id: userId },
            userData,
            { upsert: true }
        )
    };
    static async getUserByAuthorId(authorId: string) {
        const user = await UserModel.findById(
            { _id: authorId }
        )
        return user;
    }

}
export default UserData;