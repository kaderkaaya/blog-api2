import { UserModel } from "../models/user.js";
class UserData {
    static async register(name: string, mail: string, phoneNumber: string, hashPass: string, userC: string) {
        return await UserModel.create({
            name,
            mail,
            phoneNumber,
            password: hashPass,
            code: userC,
            verifyCode: false
        })
    }
    static async getUser(mail: string, phoneNumber: string) {
        const user = await UserModel.findOne({
            phoneNumber,
            mail
        });
        return user;
    };
    static async getUserWithPhoneNum(phoneNumber: string) {
        const user = await UserModel.findOne({
            phoneNumber
        });
        return user;
    }
    static async getMe(userId: string) {
        const user = await UserModel.findById({
            _id: userId
        });
        return user;
    }
    static async verifiedUserCode(userId: string,) {
        const user = await UserModel.findByIdAndUpdate(
            { _id: userId },
            { verifyCode: true }
        )
        return user;
    }
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
    }

}
export default UserData;