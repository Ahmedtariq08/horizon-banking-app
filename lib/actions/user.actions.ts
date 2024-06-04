"use server";
import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";
import {
    ApiResponse,
    generateSuccessResponse,
    generateErrorResponse,
} from "../api";

// We can import these action functions in any of our client or server components

export const signIn = async ({
    email,
    password,
}: signInProps): Promise<ApiResponse<unknown>> => {
    try {
        const { account } = await createAdminClient();
        const response = await account.createEmailPasswordSession(
            email,
            password,
        );
        cookies().set(process.env.SESSION_KEY!, response.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        const data = parseStringify(response);
        return generateSuccessResponse(data);
    } catch (error: any) {
        console.log("Error", error.message);
        return generateErrorResponse(error);
    }
};

export const signUp = async (
    userData: SignUpParams,
): Promise<ApiResponse<unknown>> => {
    try {
        const { email, password, firstName, lastName } = userData;
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            `${firstName} ${lastName}`,
        );
        const session = await account.createEmailPasswordSession(
            email,
            password,
        );

        cookies().set(process.env.SESSION_KEY!, session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        const data = parseStringify(newUserAccount);
        return generateSuccessResponse(data);
    } catch (error: any) {
        console.error("Error", error.message);
        return generateErrorResponse(error);
    }
};

export const getLoggedInUser = async (): Promise<ApiResponse<User>> => {
    try {
        const { account } = await createSessionClient();
        const user = await account.get();
        return generateSuccessResponse(parseStringify(user));
    } catch (error: any) {
        console.error(error);
        return generateErrorResponse(error);
    }
};

export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();
        cookies().delete(process.env.SESSION_KEY!);
        await account.deleteSession("current");
        return generateSuccessResponse("Logged out successfully.");
    } catch (error: any) {
        return generateErrorResponse(error);
    }
};
