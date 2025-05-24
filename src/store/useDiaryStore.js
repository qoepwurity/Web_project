import { create } from 'zustand';

const useDiaryStore = create((set) => ({
  entries: [],
  keyword: '',
  setEntries: (data) => set({ entries: data }),
  setKeyword: (k) => set({ keyword: k }),
}));

export default useDiaryStore;
