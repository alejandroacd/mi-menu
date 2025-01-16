import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Restaurant } from "@/types";

interface RestaurantStore {
  activeRestaurant: Restaurant | null;
  setActiveRestaurant: (restaurant: Restaurant | null) => void;
}

export const useActiveRestaurantStore = create<RestaurantStore>(
  persist(
    (set) => ({
      activeRestaurant: null,
      setActiveRestaurant: (restaurant: Restaurant) => set({ activeRestaurant: restaurant }),
    }),
    {
      name: 'restaurant-storage', // Key to store in localStorage
      getStorage: () => localStorage, // Storage mechanism
      serialize: (state: any) => JSON.stringify(state), // Serialize state to string
      deserialize: (str: any) => JSON.parse(str), // Deserialize state from string
    } as any
  ) as any
);
