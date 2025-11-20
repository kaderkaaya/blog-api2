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
            { verifyCode: true },
            { new: true }
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

    static async getUserBlogs(userId: string) {
        const userBlogs = await UserModel.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(userId) }
            },
            {
                $lookup: {
                    from: "blogs",
                    localField: "_id",
                    foreignField: "authorId",
                    as: "blogs"
                }
            },
            {
                $addFields: {
                    totalBlogs: { $size: "$blogs" }
                }
            },

        ])
        console.log('blogs', userBlogs);

        return userBlogs;
    }

    static async getUsers(){
        const users = await UserModel.find({
            verifyCode:true,
            status:1
        })
        return users;
    }

}
export default UserData;