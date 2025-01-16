'use server'
import { revalidatePath, revalidateTag } from "next/cache"
import { createClient } from "@/utils/supabase/server"
export async function insertRestaurant(restaurant: any) {
  try {
    const res = await fetch('http://localhost:3000/api/restaurants', {
      method: 'POST',
      body: JSON.stringify(restaurant)
    })
    const data = await res.json()
     revalidateTag('restaurants')
    return data

  }
  catch (error) {
    console.log(error)
    throw new Error('Error al crear el restaurante')
  }

}

export const sendToServer = async (restaurant: any) => {
  console.log(restaurant)
  const supabase = await createClient()
  const { error, data } = await supabase
  .from('restaurants')
  .insert([restaurant])
  .select('*')

  if (error) {
    return {
      error: true,
      message: error.message
    }
  }

  revalidateTag('restaurants')
  if (data && data.length > 0) {
    return {
      error: false,
      data
    }
  }
} 