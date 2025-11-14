import argon2 from "argon2";
class HashHelper {
    static async hashPassword(password: string) {
        try {
            const hash = await argon2.hash(password, {
                type: argon2.argon2id,
                memoryCost: 65536,
                timeCost: 3,
                parallelism: 4
            })
            return hash;

        } catch (error) {
            throw new Error(`error: ${error}`)
        }
    };

    static async verifyPassword(password: string, userPassword: string) {
        try {
            const verifyPass = await argon2.verify(password, userPassword)
            return verifyPass;

        } catch (error) {
            throw new Error(`error: ${error}`)
        }
    };

}
export default HashHelper;


