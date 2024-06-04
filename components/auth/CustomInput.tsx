import {
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authFormSchema } from "@/lib/schema";
import React from "react";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";

const formSchema = authFormSchema("sign-up");
interface CustomInputProps {
    control: Control<z.infer<typeof formSchema>>;
    name: FieldPath<z.infer<typeof formSchema>>;
    label: string;
    placeholder: string;
    type?: React.HTMLInputTypeAttribute;
}

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
                                autoComplete="new-password"
                                spellCheck={false}
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
