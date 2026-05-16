import { create } from 'zustand';

interface SelectedItem {
  id: string;
  projectName: string;
}

interface ItemsStore {
  selectedItem: SelectedItem | null;
  setSelectedItem: (item: SelectedItem) => void;
  clearSelectedItem: () => void;
}

export const useItemsStore = create<ItemsStore>((set) => ({
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
  clearSelectedItem: () => set({ selectedItem: null }),
}));