import * as React from "react";
import {
  FormProvider,
  UseFormReturn,
  FieldValues,
  FieldPath,
  FieldError,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { FormField } from "./form-field";

interface FormProps<T extends FieldValues> 
  extends React.FormHTMLAttributes<HTMLFormElement> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
}

function Form<T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
  ...props
}: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
}

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

interface FormItemProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  label?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

function FormItem<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  required,
  className,
  children,
}: FormItemProps<TFieldValues, TName>) {
  const {
    formState: { errors },
  } = React.useContext(FormProvider) as UseFormReturn<TFieldValues>;
  
  const error = errors[name] as FieldError | undefined;
  
  return (
    <FormField
      id={name}
      label={label}
      error={!!error}
      errorMessage={error?.message}
      required={required}
      className={className}
    >
      <FormFieldContext.Provider value={{ name }}>
        {children}
      </FormFieldContext.Provider>
    </FormField>
  );
}

export { Form, FormItem }; 