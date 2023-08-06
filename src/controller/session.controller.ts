import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createSession, findSessions, updateSession } from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";
import logger from "../utils/logger";

export async function createSessionHandler(req: Request, res: Response) {
    try {
        // Validate the user password
        const user = await validatePassword(req.body)
        if(!user){
            return res.status(401).send("Invalid user or password")
        }
        // Create a session

        const session = await createSession(user._id,req.get("user-agent")||"")



        // Create access token
        const accessToken = signJwt(
          {
            ...user,
            session: session._id,
          },
          { expiresIn: config.get("accessTokenTtl") }
        );
        // Create refresh token
          const refreshToken = signJwt(
            {
              ...user,
              session: session._id,
            },
            { expiresIn: config.get("refreshTokenTtl") }
          );

        // Send refresh & access token back 
        return res.send({accessToken,refreshToken})

    } catch (error: any) {} 
}


export async function getUserSessionHandler(req: Request,res: Response){
    const userId = res.locals.user._id
    const sessions = await findSessions({user:userId,valid:true})
    return res.send(sessions)
}


export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;
  await updateSession({_id:sessionId,},{valid:false})
  return res.send({
    accessToken: null,
    refreshToken: null,
  })
}