import { UserModel } from "../models/user.js";
class UserData {
    static async register(name: string, mail: string, phoneNumber: string, hashPass: string) {
        return await UserModel.create({ name, mail, phoneNumber, password:hashPass })
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
    static async getMe(userId:string){
      const user = await UserModel.findById({
        _id:userId
      });
      return user;
    }

}
export default UserData;