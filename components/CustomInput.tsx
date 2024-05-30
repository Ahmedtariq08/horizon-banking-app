import React from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldPath, UseFormReturn } from "react-hook-form";
import { ZodObject, z } from "zod";
import { authFormSchema } from "@/lib/schema";
import { Control } from "react-hook-form";

interface CustomInputProps<TSchema extends ZodObject<any>> {
    control: Control<z.infer<TSchema>>;
    name: FieldPath<z.infer<TSchema>>;
    label: string;
    placeholder: string;
    type?: React.HTMLInputTypeAttribute;
}
// interface CustomInputProps {
//     control: Control<z.infer<typeof authFormSchema>>;
//     name: FieldPath<z.infer<typeof authFormSchema>>;
//     label: string;
//     placeholder: string;
//     type?: React.HTMLInputTypeAttribute;
// }

const CustomInput = ({
    control,
    name,
    label,
    placeholder,
    type,
}: CustomInputProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className="form-item">
                    <FormLabel className="form-label">{label}</FormLabel>
                    <div className="flex w-full flex-col">
                        <FormControl>
                            <Input
                                placeholder={placeholder}
                                className="input-class"
                                type={type}
                                {...field}
                            ></Input>
                        </FormControl>
                        <FormMessage className="form-message mt-2"></FormMessage>
                    </div>
                </div>
            )}
        />
    );
};

export default CustomInput;
