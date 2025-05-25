import { create } from 'zustand';

const useDiaryStore = create((set) => ({
  entries: [],

  loadEntries: (email) => {
    const key = `diaryEntries:${email}`;
    const saved = JSON.parse(localStorage.getItem(key)) || [];
    set({ entries: saved });
  },

  saveEntries: (email, updatedEntries) => {
    const key = `diaryEntries:${email}`;
    localStorage.setItem(key, JSON.stringify(updatedEntries));
    set({ entries: updatedEntries });
  },

  addEntry: (email, newEntry) => {
    const key = `diaryEntries:${email}`;
    const saved = JSON.parse(localStorage.getItem(key)) || [];
    const updated = [...saved, newEntry];
    localStorage.setItem(key, JSON.stringify(updated));
    set({ entries: updated });
  },

  deleteEntry: (email, id) => {
    const key = `diaryEntries:${email}`;
    const saved = JSON.parse(localStorage.getItem(key)) || [];
    const updated = saved.filter((e) => e.id !== id);
    localStorage.setItem(key, JSON.stringify(updated));
    set({ entries: updated });
  },

  updateEntry: (email, id, updatedFields) => {
    const key = `diaryEntries:${email}`;
    const saved = JSON.parse(localStorage.getItem(key)) || [];
    const updated = saved.map((e) =>
      e.id === id ? { ...e, ...updatedFields } : e
    );
    localStorage.setItem(key, JSON.stringify(updated));
    set({ entries: updated });
  }
}));

export default useDiaryStore;
