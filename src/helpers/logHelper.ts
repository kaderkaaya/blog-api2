import { logger } from "../helpers/logger.js"

class LogHelper {

    static async logError(message: string, userid: object, type: string, content: string) {
        const log = logger.error(message, {
            userid,
            type,
            content,
        });
        return log;

    }
}
export default LogHelper;