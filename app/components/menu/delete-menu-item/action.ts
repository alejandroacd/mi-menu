'use server'
import { createClient } from "@/utils/supabase/server"
import { revalidateTag } from "next/cache";
import { MenuItem } from "@/types";
export async function deleteMenuItemFromRestaurant(
    restaurantId: string | undefined,
    menuItemId: string,
    currentMenuItems: MenuItem[]
  ) {
    if (!restaurantId || !menuItemId || !currentMenuItems) {
      throw new Error("Missing required parameters");
    }
  
    const supabase = await createClient();
  
    // Filter out the menu item to be deleted
    const updatedMenuItems = currentMenuItems.filter(
      (item) => item.id !== menuItemId
    );
  
    // Update the restaurant's menu items in the database
    const { data, error } = await supabase
      .from("restaurants")
      .update({ menu_items: updatedMenuItems })
      .eq("id", restaurantId)
      .select("*");
  
    if (error) {
      throw error;
    }
  
    // Revalidate cache to ensure the client reflects the latest data
    revalidateTag("restaurants");
  
    return {
      data,
      error: false,
    };
  }