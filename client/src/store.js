import { create } from 'zustand'

export const useStore = create((set) => ({
  boolval: 0,
  OnUserLogin: () => set((state) => ({ boolval: 1 })),
  Onlogout: () => set({ boolval: 0 }),
  OnSellerLogin: () => set((state) => ({ boolval: 2})),

}))
