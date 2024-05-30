import { z } from "zod";

// Helper functions for error messages
const requiredMsg = (field: string) => `${field} is required`;

const optionalString = z.string().optional();

export const authFormSchema = (type: "sign-in" | "sign-up") => {
    const isSignIn = type === "sign-in";

    return z.object({
        // Sign up
        firstName: isSignIn
            ? optionalString
            : z.string().min(3, { message: requiredMsg("First Name") }),
        lastName: isSignIn
            ? optionalString
            : z.string().min(3, { message: requiredMsg("Last Name") }),
        address: isSignIn
            ? optionalString
            : z.string().max(50, {
                  message: "Address must be at most 50 characters long",
              }),
        city: isSignIn
            ? optionalString
            : z.string().max(50, {
                  message: "City must be at most 50 characters long",
              }),
        state: isSignIn
            ? optionalString
            : z.string().length(2, {
                  message: "State must be exactly 2 characters long",
              }),
        postalCode: isSignIn
            ? optionalString
            : z.number().refine((val) => val >= 100 && val <= 999999, {
                  message: "Postal Code must be between 3 and 6 digits",
              }),
        dateOfBirth: isSignIn
            ? optionalString
            : z.string().refine(
                  (date) => {
                      const parsedDate = new Date(date);
                      return !isNaN(parsedDate.getTime());
                  },
                  { message: "Invalid date format" },
              ),
        ssn: isSignIn
            ? optionalString
            : z.number().refine((val) => val.toString().length >= 3, {
                  message: "SSN must be at least 3 digits long",
              }),
        // Both
        email: z
            .string()
            .email({ message: "Invalid email address" })
            .nonempty({ message: "Email is required" }),
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
};
