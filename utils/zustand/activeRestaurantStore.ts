import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Restaurant, MenuItem } from "@/types";

interface RestaurantStore {
  activeRestaurant: Restaurant | null;
  menuItems: MenuItem[];
  setActiveRestaurant: (restaurant: Restaurant | null) => void;
  categories: string[];

}

export const useActiveRestaurantStore = create<RestaurantStore>(
  persist(
    (set) => ({
      activeRestaurant: null,
      menuItems: [],
      categories: [],
      setActiveRestaurant: (restaurant: Restaurant | null) =>
        set((state: any) => ({
          activeRestaurant: restaurant,
          menuItems: restaurant ? restaurant.menu_items : [], // Update menuItems based on activeRestaurant
          categories: Array.from(new Set(restaurant?.menu_items?.map((item: MenuItem) => item.category)))
        })),
    }),
    {
      name: 'restaurant-storage', // Key to store in localStorage
      getStorage: () => localStorage, // Storage mechanism
      serialize: (state: any) => JSON.stringify(state), // Serialize state to string
      deserialize: (str: any) => JSON.parse(str), // Deserialize state from string
    } as any
  ) as any
);
