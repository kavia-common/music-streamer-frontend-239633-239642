import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "spotifyClone.uiSettings.v1";

const UISettingsContext = createContext(null);

/**
 * @typedef {"light"|"dark"} ThemeMode
 */

function safeParseJSON(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

/**
 * Applies the theme to the document root element by toggling Tailwind's `dark` class.
 * Also updates `color-scheme` to improve form controls / scrollbars in supported browsers.
 */
function applyThemeToRoot(theme) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const isDark = theme === "dark";
  root.classList.toggle("dark", isDark);

  // Helps native UI elements match the theme.
  root.style.colorScheme = isDark ? "dark" : "light";
}

function readInitialSettings() {
  // SSR safety (CRA is client-only, but keep it robust)
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  const parsed = safeParseJSON(raw);
  if (!parsed || typeof parsed !== "object") return null;

  // Only accept known fields to avoid older/unknown keys causing issues.
  const theme = parsed.theme === "light" || parsed.theme === "dark" ? parsed.theme : undefined;

  return {
    ...(theme ? { theme } : {})
  };
}

const defaultSettings = {
  theme: "dark"
};

// PUBLIC_INTERFACE
export function UISettingsProvider({ children }) {
  /** Provides persisted UI settings (e.g., theme) across the app. */
  const [settings, setSettings] = useState(() => {
    const initial = readInitialSettings();
    return { ...defaultSettings, ...(initial ?? {}) };
  });

  useEffect(() => {
    // Apply theme changes immediately so the entire UI updates.
    applyThemeToRoot(settings.theme);
  }, [settings.theme]);

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
      setTheme: (theme) => {
        /** Sets the theme ("light" vs "dark") and persists it. */
        setSettings((prev) => ({ ...prev, theme }));
      },

      // PUBLIC_INTERFACE
      toggleTheme: () => {
        /** Convenience toggle for theme. */
        setSettings((prev) => ({
          ...prev,
          theme: prev.theme === "dark" ? "light" : "dark"
        }));
      }
    };
  }, [settings]);

  return (
    <UISettingsContext.Provider value={api}>{children}</UISettingsContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useUISettings() {
  /** Hook to access UI settings. */
  const ctx = useContext(UISettingsContext);
  if (!ctx) throw new Error("useUISettings must be used within UISettingsProvider");
  return ctx;
}
