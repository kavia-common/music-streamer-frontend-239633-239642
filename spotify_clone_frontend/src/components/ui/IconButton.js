import React from "react";
import classNames from "classnames";

// PUBLIC_INTERFACE
export default function IconButton({
  children,
  className,
  label,
  onClick,
  disabled,
  type = "button"
}) {
  /** Reusable icon-only button with accessible label. */
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        "inline-flex items-center justify-center rounded-full p-2 transition",
        "text-black/70 hover:bg-black/10 hover:text-black",
        "dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white",
        "disabled:opacity-40 disabled:hover:bg-transparent",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-spotify-green/70",
        className
      )}
    >
      {children}
    </button>
  );
}
