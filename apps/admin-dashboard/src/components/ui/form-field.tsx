import * as React from "react";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  id?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  children: React.ReactNode;
  className?: string;
  labelClassName?: string;
  required?: boolean;
}

export function FormField({
  id,
  label,
  error,
  errorMessage,
  children,
  className,
  labelClassName,
  required,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "text-sm font-medium text-foreground",
            labelClassName
          )}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {children}
      {error && errorMessage && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
} 