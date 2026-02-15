import React, { useEffect } from "react";

/**
 * Simple accessible modal:
 * - Closes on Escape
 * - Closes on overlay click
 * - Locks background scroll while open
 */

// PUBLIC_INTERFACE
export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  className = "",
  panelClassName = ""
}) {
  /** Generic modal component for dialogs. */

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    // Prevent background scroll while modal is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={[
        "fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6",
        className
      ].join(" ")}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      aria-describedby={description ? "modal-desc" : undefined}
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
        onClick={() => onClose?.()}
      />

      {/* Panel */}
      <div
        className={[
          "relative w-full max-w-md rounded-2xl border border-black/10 bg-white shadow-xl",
          "ring-1 ring-black/5",
          "dark:border-white/10 dark:bg-spotify-black dark:ring-white/5",
          panelClassName
        ].join(" ")}
      >
        <div className="flex items-start justify-between gap-4 border-b border-black/10 px-5 py-4 dark:border-white/10">
          <div className="min-w-0">
            <div className="truncate text-base font-bold text-black dark:text-white">{title}</div>
            {description ? (
              <div id="modal-desc" className="mt-1 text-sm text-black/60 dark:text-white/60">
                {description}
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => onClose?.()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-black/60 transition hover:bg-black/10 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-spotify-green/70 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
            aria-label="Close"
            title="Close"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>

        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
}
