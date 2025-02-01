'use server'
import { createClient } from '@/utils/supabase/client';
import { MenuItem } from '@/types';
import { revalidateTag } from 'next/cache';

export async function upsertMenuItemInRestaurant(
  restaurantId: string | undefined,
  menuItem: MenuItem,
  currentMenuItems: MenuItem[],
  operation: 'add' | 'edit'
) {
  const supabase = createClient();
  let updatedMenuItems;

  if (operation === 'add') {
    // Assign a unique ID to the new menu item
    const menuItemWithId = { id: crypto.randomUUID().toString(), ...menuItem };
    // Add the new menu item to the current list
    updatedMenuItems = [...currentMenuItems, menuItemWithId];
  } else if (operation === 'edit') {
    console.log('OPERATION')
    // Find and update the menu item in the current list
    updatedMenuItems = currentMenuItems.map((item) =>
      item.id === menuItem.id ? { ...item, ...menuItem } : item
    );

  }


  // Update the restaurant with the modified menu items array
  const { data, error } = await supabase
    .from('restaurants')
    .update({ menu_items: updatedMenuItems })
    .eq('id', restaurantId)
    .select('*');
  if (error) {
    throw error;
  }


  // Revalidate cache or tags if necessary
  revalidateTag('restaurants');

  return {
    data,
    error: false,
  };
}
