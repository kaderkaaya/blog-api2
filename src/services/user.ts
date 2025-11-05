import UserData from "../data/user.js";

class UserService {
    static async register(name: string, mail: string, phoneNumber: string, password: string) {
        const user = await UserData.getUser(mail, phoneNumber);
        if(user){
            throw new Error('This user already exists');
        }
        return await UserData.register(name, mail, phoneNumber, password)
    }
}
export default UserService;