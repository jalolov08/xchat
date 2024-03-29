import {create} from 'zustand';

interface SelectState {
  selectedItems: string[];
  selectItem: (itemId: string) => void;
  deselectItem: (itemId: string) => void;
  clearSelection: () => void;
}

const useSelect = create<SelectState>((set) => ({
  selectedItems: [],
  selectItem: (itemId) =>
    set((state) => ({ selectedItems: [...state.selectedItems, itemId] })),
  deselectItem: (itemId) =>
    set((state) => ({
      selectedItems: state.selectedItems.filter((id) => id !== itemId),
    })),
  clearSelection: () => set({ selectedItems: [] }),
}));

export default useSelect;
