"use client";

import { WelcomeCard } from "./index";
import { useActiveRestaurantStore } from "@/utils/zustand/activeRestaurantStore";
export function ConditionalWelcomeCard() {
  const { activeRestaurant } = useActiveRestaurantStore();
  console.log(activeRestaurant)
  if (activeRestaurant) {
    return null;
  }

  return <WelcomeCard />;
}
