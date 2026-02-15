import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignInAlt, FaUserPlus, FaCog, FaQuestionCircle } from "react-icons/fa";
import Modal from "../ui/Modal";

// PUBLIC_INTERFACE
export default function UserModal({ open, onClose }) {
  /** User/profile modal with mock auth navigation (no backend). */
  const navigate = useNavigate();

  const go = (path) => {
    onClose?.();
    navigate(path);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Account"
      description="Mock account menu (frontend-only)"
      panelClassName="max-w-sm"
    >
      <div className="flex items-center gap-3">
        <FaUserCircle className="h-10 w-10 text-white/80" />
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-white">Demo User</div>
          <div className="truncate text-xs text-white/60">Not signed in</div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <button
          type="button"
          onClick={() => go("/signin")}
          className="flex w-full items-center justify-between gap-3 rounded-xl bg-white/5 px-4 py-3 text-left transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-spotify-green/70"
        >
          <div className="flex items-center gap-3 min-w-0">
            <FaSignInAlt className="h-4 w-4 text-white/80" />
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-white">Sign in</div>
              <div className="truncate text-xs text-white/60">Access your account (mock)</div>
            </div>
          </div>
          <span className="text-xs text-white/50">→</span>
        </button>

        <button
          type="button"
          onClick={() => go("/signup")}
          className="flex w-full items-center justify-between gap-3 rounded-xl bg-white/5 px-4 py-3 text-left transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-spotify-green/70"
        >
          <div className="flex items-center gap-3 min-w-0">
            <FaUserPlus className="h-4 w-4 text-white/80" />
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-white">Sign up</div>
              <div className="truncate text-xs text-white/60">Create a new account (mock)</div>
            </div>
          </div>
          <span className="text-xs text-white/50">→</span>
        </button>

        <div className="mt-3 border-t border-white/10 pt-3">
          <div className="grid grid-cols-1 gap-2">
            <button
              type="button"
              onClick={() => onClose?.()}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-spotify-green/70"
            >
              <FaCog className="h-4 w-4 text-white/60" />
              Settings (mock)
            </button>
            <button
              type="button"
              onClick={() => onClose?.()}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-spotify-green/70"
            >
              <FaQuestionCircle className="h-4 w-4 text-white/60" />
              Help (mock)
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
