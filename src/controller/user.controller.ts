import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";
import { omit } from "lodash";

export async function createUserHandler(req:Request<{},{},CreateUserInput["body"]>,res:Response){
    try {
        logger.info(req)
        const user = await createUser(req.body)
        return res.send(omit(user.toJSON(),"password"))
    } catch (error:any) {
        logger.error(error)
        //409 means confict
        return res.status(409).send(error.message)
    }
}

