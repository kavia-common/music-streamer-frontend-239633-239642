import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "spotifyClone.uiSettings.v1";

const UISettingsContext = createContext(null);

/**
 * @typedef {"fullscreen"|"inapp"} AuthLayoutMode
 */

function safeParseJSON(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function readInitialSettings() {
  // SSR safety (CRA is client-only, but keep it robust)
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  const parsed = safeParseJSON(raw);
  if (!parsed || typeof parsed !== "object") return null;

  // Only accept known fields to avoid older/unknown keys causing issues.
  const authLayoutMode =
    parsed.authLayoutMode === "fullscreen" || parsed.authLayoutMode === "inapp"
      ? parsed.authLayoutMode
      : undefined;

  return {
    ...(authLayoutMode ? { authLayoutMode } : {})
  };
}

const defaultSettings = {
  // Keep current behavior as default to avoid breaking existing navigation.
  authLayoutMode: "fullscreen"
};

// PUBLIC_INTERFACE
export function UISettingsProvider({ children }) {
  /** Provides persisted UI settings (e.g., auth layout mode) across the app. */
  const [settings, setSettings] = useState(() => {
    const initial = readInitialSettings();
    return { ...defaultSettings, ...(initial ?? {}) };
  });

  useEffect(() => {
    // Persist any changes.
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Ignore storage failures (private mode, quota, etc.)
    }
  }, [settings]);

  const api = useMemo(() => {
    return {
      settings,

      // PUBLIC_INTERFACE
      setAuthLayoutMode: (mode) => {
        /** Sets the auth layout mode ("fullscreen" vs "inapp") and persists it. */
        setSettings((prev) => ({ ...prev, authLayoutMode: mode }));
      },

      // PUBLIC_INTERFACE
      toggleAuthLayoutMode: () => {
        /** Convenience toggle for auth layout mode. */
        setSettings((prev) => ({
          ...prev,
          authLayoutMode: prev.authLayoutMode === "fullscreen" ? "inapp" : "fullscreen"
        }));
      }
    };
  }, [settings]);

  return (
    <UISettingsContext.Provider value={api}>
      {children}
    </UISettingsContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useUISettings() {
  /** Hook to access UI settings. */
  const ctx = useContext(UISettingsContext);
  if (!ctx) throw new Error("useUISettings must be used within UISettingsProvider");
  return ctx;
}
