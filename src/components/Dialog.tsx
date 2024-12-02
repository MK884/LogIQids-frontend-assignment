import React from "react";

interface DialogProps {
  children: React.ReactNode;
}

const Dialog = React.forwardRef<HTMLDialogElement, DialogProps>(
  ({ children }, ref) => {
    return (
      <dialog
        ref={ref}
        className="outline-none max-h-dvh backdrop:bg-black/50"
        aria-modal="true"
        role="dialog"
      >
        <div className="overflow-hidden max-h-[95%] shadow-sm border-2 rounded-xl w-[95%] fixed max-w-[600px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          {children}
        </div>
      </dialog>
    );
  }
);

export default Dialog;
