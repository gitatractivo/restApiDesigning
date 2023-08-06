import { Express, Request, Response } from "express"
import { createUserHandler } from "./controller/user.controller"
import validateResource from "./middleware/validateResouce";
import { createUserSchema } from "./schema/user.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createSessionHandler, deleteSessionHandler, getUserSessionHandler } from "./controller/session.controller";
import deserializeUser from "./middleware/deserializeUser";
import requireUser from "./middleware/requireUser";
import {
  createProductHandler,
  getProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "./controller/product.controller";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schema/product.schema";

function routes(app:Express){
    app.get('/healthcheck',(req:Request,res:Response)=>res.sendStatus(200))
    app.post("/api/users", validateResource(createUserSchema), createUserHandler);

    app.post(
      "/api/sessions",
      validateResource(createSessionSchema),
      createSessionHandler
    );

    app.get("/api/sessions",requireUser,getUserSessionHandler)
    app.delete("/api/sessions", requireUser, deleteSessionHandler);


    app.post(
      "/api/products",
      [requireUser, validateResource(createProductSchema)],
      createProductHandler
    );

    app.put(
      "/api/products/:productId",
      [requireUser, validateResource(updateProductSchema)],
      updateProductHandler
    );

    app.get(
      "/api/products/:productId",
      validateResource(getProductSchema),
      getProductHandler
    );

    app.delete(
      "/api/products/:productId",
      [requireUser, validateResource(deleteProductSchema)],
      deleteProductHandler
    );
    
}
export default routes