import _ from "lodash";
import z,{TypeOf, object} from "zod"


export const createUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is Required",
    }),
    password: z
      .string({
        required_error:"Password is required"
      })
      .min(6, "Password is too short")
      .refine(
        (value) => /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).+$/.test(value),
        {
          message:
            "Password must contain at least one uppercase letter, one digit, and one special character",
        }
      ),
      
    passwordConfirmation: z.string({
      required_error: "Confirm Password is Required",
    }),
    email: z.string({
        required_error: "Email is Required",
    }).email()
  }).refine(data=>data.password===data.passwordConfirmation,{
    message:"Password and Confirm Password do not match",
    path:["passwordConfirmation"]
  }),
});


export type CreateUserInput = TypeOf<typeof createUserSchema>