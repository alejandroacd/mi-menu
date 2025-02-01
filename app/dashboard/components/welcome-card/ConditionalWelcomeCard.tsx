"use client";

import { WelcomeCard } from "./index";
import { useActiveRestaurantStore } from "@/utils/zustand/activeRestaurantStore";
export function ConditionalWelcomeCard() {
  const { activeRestaurant } = useActiveRestaurantStore();
  if (activeRestaurant) {
    return null;
  }

  return <WelcomeCard />;
}
