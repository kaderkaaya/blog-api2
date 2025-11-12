class ApiHelper extends Error {
    code: number;
    message: string;
    constructor(message: any, code: any) {
        super(message);
        this.message = message;
        this.code = code;
    }
}
export default ApiHelper;