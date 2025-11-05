import UserData from "../data/user.js";

class UserService {
    static async register(name: string, mail: string, phoneNumber: string, password: string) {
        return await UserData.register(name, mail, phoneNumber, password)
    }
}
export default UserService;