'use server'
import { revalidateTag } from "next/cache"
import { createClient } from "@/utils/supabase/server"
export const sendToServer = async ({
  restaurant,
  isEdit,
}: {
  restaurant: any;
  isEdit: boolean;
}) => {
  console.log(restaurant)
  const supabase = await createClient();
  const table = supabase.from('restaurants');
  let response;
  if (isEdit) {
    response = await table
      .update(restaurant)
      .eq('id', restaurant.id)
      .select('*');

  } else {
    console.log('creating')
    response = await table.insert([restaurant]).select('*');
  }

  const { data, error } = response;

  if (error) {
    console.log(error)
    return {
      error: true,
      message: error.message,
    };
  }

  revalidateTag('restaurants');

  return {
    error: false,
    data,
  };
};

