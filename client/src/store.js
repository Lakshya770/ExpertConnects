
import { create } from 'zustand'

export const useStore = create((set) => ({
  boolval: 0,
  loggedInuser: null,

  OnUserLogin: (user) => set({loggedInuser:user ,boolval: 1 }),
  Onlogout: () => set({ boolval: 0, loggedInuser: null }),
  OnSellerLogin: (seller) => set({loggedInuser:seller ,boolval: 2}),

}))



