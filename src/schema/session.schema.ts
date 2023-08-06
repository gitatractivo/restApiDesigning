import _ from "lodash";
import z,{TypeOf, object} from "zod"


export const createSessionSchema = z.object({
  body: z.object({
    email: z.string({
        required_error: "Email is Required",
    }),
    password: z
      .string({
        required_error:"Password is required"
      })
      
      
  
  })
});


export type CreateSessionInput = TypeOf<typeof createSessionSchema>;