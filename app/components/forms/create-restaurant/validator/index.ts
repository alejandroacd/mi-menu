import { z } from "zod"

export const restaurantSchema = z.object({
  id: z.string().optional(),
    avatar: z.string().optional(),
    name: z.string().min(2, {
      message: 'El nombre debe tener al menos 2 caracteres.',
    }),
    description: z.string().optional().nullable(),
    openHours: z.array(z.object({
      day: z.string(),
      isOpen: z.boolean(),
      openTime: z.string().optional(),
      closeTime: z.string(),
    })),
    address: z.string().optional(),
    email: z.string().optional().refine(val => val === '' || /^[^@]+@[^@]+\.[^@]+$/.test(val ?? ''), {
      message: "El email debe tener un fomato válido.",
    }),
    phone: z.string()
    .regex(/^\d*$/, {
      message: "El teléfono solo puede contener números.",
    })
    .optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    user_id: z.union([z.number(), z.string()]).optional(), 
    url: z.string().nonempty({ message: 'La URL es requerida.' }),
    

  })
  