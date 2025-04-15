import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  className,
}: ModalProps) {
  const [isClosing, setIsClosing] = React.useState(false);

  // Handle ESC key
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Handle animation when closing
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity">
      <div className="fixed inset-0" onClick={handleClose} />
      <div
        className={cn(
          "relative z-50 bg-white rounded-lg shadow-lg w-full transform transition-transform duration-200",
          sizeClasses[size],
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100",
          className
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <h3 className="text-lg font-medium">{title}</h3>
              {description && (
                <p className="text-sm text-gray-500">{description}</p>
              )}
            </div>
            <Button
              onClick={handleClose}
              variant="ghost"
              size="sm"
              className="p-1 rounded-full"
            >
              <span className="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
        )}

        {/* Body */}
        <div className="p-4">{children}</div>

        {/* Footer */}
        {footer && <div className="p-4 border-t">{footer}</div>}
      </div>
    </div>
  );
} 