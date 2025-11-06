import crypto from "crypto";
import bcrypt from "bcrypt";
const salt = 10;

export function generateCode(length = 5) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, chars.length);
        code += chars[randomIndex]
    }
    return code;
}

export async function hashCode(code: string,) {
   const hashCode = bcrypt.hash(code, salt)
   return hashCode;
}
export async function verifyUserCode(code: string, hashedCode: string) {
     const verifiedCode = await bcrypt.compare(code, hashedCode)
     return verifiedCode;
}