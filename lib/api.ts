// API
interface SuccessApiResponse<T> {
    data: T;
    error: null;
    isSuccess: true;
}

interface ErrorApiResponse<T> {
    data: null;
    error: { statusCode: number; message: string };
    isSuccess: false;
}

export type ApiResponse<T> = SuccessApiResponse<T> | ErrorApiResponse<T>;

export const generateSuccessResponse = <T>(data: T): SuccessApiResponse<T> => {
    return {
        data: data,
        error: null,
        isSuccess: true,
    };
};

export const generateErrorResponse = <T>(error: any): ErrorApiResponse<T> => {
    const message = error?.message ?? "Error";
    const statusCode = error?.statusCode ?? 500;
    return {
        data: null,
        error: { statusCode, message },
        isSuccess: false,
    };
};
