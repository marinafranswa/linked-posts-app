import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().nonempty("Email is required").email("enter a valid email"),
  password: z
    .string()
    .nonempty("Password is required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Enter a valid Password",
    ),
});
