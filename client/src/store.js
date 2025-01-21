import { create } from 'zustand'

export const useStore = create((set) => ({
  boolval: 0,
  loggedInuser: null,

  OnUserLogin: () => set((user) => ({loggedInuser:state ,boolval: 1 })),
  Onlogout: () => set({ boolval: 0, loggedInuser: null }),
  OnSellerLogin: () => set((seller) => ({loggedInuser:seller ,boolval: 2})),

}))
