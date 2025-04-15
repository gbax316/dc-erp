import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  errorMessage?: string;
  label?: string;
  options: { value: string; label: string }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, error, errorMessage, label, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={props.id} className="text-sm font-medium">
            {label}
          </label>
        )}
        <select
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && errorMessage && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select }; 