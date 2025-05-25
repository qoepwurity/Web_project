import { create } from 'zustand';

const useDarkModeStore = create((set) => ({
  isDark: false,
  toggleDark: () => {
    set((state) => {
      const newMode = !state.isDark;
      const root = document.documentElement;
      if (newMode) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      return { isDark: newMode };
    });
  }
}));

export default useDarkModeStore;