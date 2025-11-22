import Transport from "winston-transport";
import { LogModel } from "../models/log.js";


class DBTransport extends Transport {

    async log(info: any, callback: any) {
        await LogModel.create({
            userid: info.userid,
            message: info.message,
            type: info.type,
            content: info.content,
        })
        callback()
    }
}
export default DBTransport;