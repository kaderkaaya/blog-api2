class ApiHelper extends Error {
    statusCode: number;
    message: string;
    constructor(message: any, statusCode: any) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    };
}

export default ApiHelper;