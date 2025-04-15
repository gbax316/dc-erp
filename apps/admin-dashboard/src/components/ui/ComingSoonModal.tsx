import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Button } from "./button";

/**
 * Props for the ComingSoonModal component
 */
interface ComingSoonModalProps {
  /**
   * Controls whether the modal is open
   */
  open: boolean;
  
  /**
   * Callback for when the open state changes
   */
  onOpenChange: (open: boolean) => void;
  
  /**
   * Title displayed in the modal header
   */
  title: string;
  
  /**
   * Optional description text shown below the title
   */
  description?: string;
  
  /**
   * Optional icon to display in the modal
   */
  icon?: React.ReactNode;
}

/**
 * A modal component that displays a "Coming Soon" message for features
 * that are still in development. Uses shadcn/ui Dialog component.
 * 
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 * 
 * <Button onClick={() => setOpen(true)}>Show Feature</Button>
 * <ComingSoonModal
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="Feature Name - Coming Soon"
 *   description="This feature will be available in an upcoming release."
 *   icon={<Icon size={24} />}
 * />
 * ```
 */
export function ComingSoonModal({
  open,
  onOpenChange,
  title,
  description = "This feature is currently in development and will be available soon.",
  icon,
}: ComingSoonModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
          {description && <DialogDescription className="mt-2">{description}</DialogDescription>}
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          {icon && (
            <div className="rounded-full bg-primary/10 p-5 text-primary">
              {icon}
            </div>
          )}
          <p className="text-center text-sm text-muted-foreground max-w-sm mx-auto">
            We're working hard to bring you this feature. Stay tuned for updates!
          </p>
        </div>
        
        <div className="flex justify-center mt-2">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ComingSoonModal; 