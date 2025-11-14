import { NextFunction, Request, Response } from "express";
class schemaHelper {
    static validateSchemaBody(schema: any) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const result = await schema.safeParseAsync(req.body);
                req.body = result.data;
                
                next();
            } catch (error) {
                res.status(400).send({ success: false, error: `${error}`, statusCode: 400 })
            }
        }
    };

    static validateSchemaQuery(schema: any) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const result = await schema.safeParseAsync(req.query);
                req.query = result.data;
                next();
            } catch (error) {
                res.status(400).send({ success: false, error: `${error}`, statusCode: 400 })
            }
        }
    };
    
}

export default schemaHelper;