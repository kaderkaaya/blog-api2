import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

async function applySecurity(app: any) {
    app.use(helmet());
    //app.use(mongoSanitize());
}
export default applySecurity;