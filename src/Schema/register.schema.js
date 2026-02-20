import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(3, "Minimum length is 3 characters")
      .max(25, "Maximum length is 25 characters"),
    email: z
      .string()
      .nonempty("Email is required")
      .email("enter a valid email"),
    password: z
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Enter a valid Password",
      ),
    rePassword: z.string().nonempty("Confirm password is required"),
    dateOfBirth: z
      .string()
      .nonempty("Date is required")
      .refine((date) => {
        let currentYear = new Date().getFullYear();
        let selectedYear = new Date(date).getFullYear();
        let age = currentYear - selectedYear;
        return age >= 18;
      }, "Age must be 18 or more"),
    gender: z.enum(["male", "female"], "Choose Gender"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Password is not matched.",
    path: ["rePassword"],
  });
