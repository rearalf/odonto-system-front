import { create } from 'zustand';

type Theme = 'light' | 'dark';
type ThemePref = Theme | 'system';

const STORAGE_KEY = 'theme';

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialPref(): ThemePref {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
}

function applyTheme(pref: ThemePref) {
  const theme = pref === 'system' ? getSystemTheme() : pref;
  document.documentElement.setAttribute('data-theme', theme);
}

interface ThemeState {
  pref: ThemePref;
  theme: Theme;
  toggleTheme: () => void;
}

const initialPref = typeof window !== 'undefined' ? getInitialPref() : 'system';

export const useThemeStore = create<ThemeState>()((set) => ({
  pref: initialPref,
  theme: initialPref === 'system' ? getSystemTheme() : initialPref,
  toggleTheme: () =>
    set(({ theme }) => {
      const pref = theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, pref);
      applyTheme(pref);
      return { pref, theme: pref };
    }),
}));

applyTheme(initialPref);