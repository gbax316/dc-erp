import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, errorMessage, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            className={cn(
              "h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary",
              error && "border-red-500 focus:ring-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
          {label && (
            <label
              htmlFor={props.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          )}
        </div>
        {error && errorMessage && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox }; 