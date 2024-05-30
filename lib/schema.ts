import { z } from "zod";

export const authFormSchema = z.object({
    email: z.string().email().nonempty({ message: "Email is required" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(16, { message: "Password must be at most 16 characters long" })
        .regex(/[a-zA-Z]/, {
            message: "Password must contain at least one letter",
        })
        .regex(/[0-9]/, {
            message: "Password must contain at least one number",
        })
        .nonempty({ message: "Password is required" }),
});
