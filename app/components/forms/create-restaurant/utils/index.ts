import { restaurantSchema } from "../validator"
import { z } from "zod"
import { uploadPhotoToCloudinary } from "@/utils/cloudinary"
import { toast } from "@/hooks/use-toast"
import {  sendToServer } from "../action"
import { Restaurant } from "@/types"
export const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
type FormValues = z.infer<typeof restaurantSchema>
interface SubmitProps {
  formData: FormValues,
  avatar?: File | null,
  user_id: string | undefined
  form: any
  setLoading: (loading: boolean) => void | undefined
  removeAvatar: () => void | undefined
  imageUrl?: string,
  setActiveRestaurant: (restaurant: Restaurant) => void
  setIsFinished: (isFinished: boolean) => void
}

const createRestaurant = async ({ formData, imageUrl, user_id, form, setLoading, removeAvatar, setActiveRestaurant, setIsFinished }: SubmitProps) => {
  const newRestaurant = {
    avatar: imageUrl,
    name: formData.name,
    address: formData.address,
    phone: formData.phone,
    email: formData.email,
    description: formData.description || '', // Provide a default empty string if undefined
    user_id,
    facebook: formData.facebook,
    open_hours: formData.openHours,
    instagram: formData.instagram,
    twitter: formData.twitter,
    url: formData.url
  };

  try {
    const insertion = await sendToServer(newRestaurant)

    if (insertion && insertion.data) {
      console.log(insertion)
      setActiveRestaurant(insertion.data[0])
      form.reset()
      removeAvatar()
      setIsFinished(true)
      return toast({
        title: 'Tu negocio se creó con exito!',
        description: 'Felicidades! :) ahora podés empezar a crear tu menú digital.',
      })
    }
    if (insertion && insertion.error) {
      return toast({
        title: 'Oops :(',
        description: 'Error al crear el restaurante. Por favor intenta de nuevo.',
        variant: 'destructive',
      })
    }
  } catch (error) {
    return toast({
      title: 'Oops :(',
      description: 'Error al crear el restaurante. Por favor intenta de nuevo.',
      variant: 'destructive',
    })
  }
  finally {
    setLoading(false)

  }
}
export const handleSubmit = async (
  { formData, avatar, user_id, form, setLoading, removeAvatar, setActiveRestaurant, setIsFinished }: SubmitProps) => {
  setLoading(true)
  let imageUrl = null

  if (avatar) {
    try {
      const response = await uploadPhotoToCloudinary(avatar as File)
      if (response) {
        imageUrl = response
        formData.avatar = response
      }
    } catch (error) {
      return toast({
        title: 'Error',
        description: 'Error al subir la imagen. Vamos a intentar crear el restaurant sin imagen.',
      })
    }
  }

  // Proceed to insert the restaurant data into Supabase
  await createRestaurant({ formData, imageUrl, user_id, form, setLoading, removeAvatar, setActiveRestaurant, setIsFinished })
}



export const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>, setAvatar: React.Dispatch<React.SetStateAction<File | null>>) => {

  const file = event?.target.files?.[0]
  if (file) {
    setAvatar(file)
  }
  else {
    setAvatar(null)
  }
}

export const removeAvatar = (setAvatar: React.Dispatch<React.SetStateAction<File | null>>, ref: React.RefObject<HTMLInputElement>) => {
  setAvatar(null)
  if (ref.current) {
    ref.current.value = ''
  }
}