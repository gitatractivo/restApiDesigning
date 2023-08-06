import { Request, Response,NextFunction } from "express";
import { AnyZodObject } from "zod";
import logger from "../utils/logger";


const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.body,
        params: req.params,
      });
      next();
    } catch (e: any) {
        // logger.error(e)
      return res.status(400).send(e.errors);
    }
  };
export default validateResource; 