import * as z from "zod";

export const changePasswordSchema = z.object({
  password: z
    .string()
    .nonempty("Old password is required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Enter a valid Password format",
    ),
  newPassword: z
    .string()
    .nonempty("New Password is required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Enter a valid Password format",
    ),
});
