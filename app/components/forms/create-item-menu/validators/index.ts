import { z } from "zod"
export const menuItemSchema = z.object({
    name: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres.",
      }),
      description: z.string().min(5, {
        message: "La descripción debe tener al menos 10 caracteres.",
      }),
      price: z.number().min(0, {
        message: "El precio no puede ser negativo.",
      }),
      image: z.instanceof(File).optional().or(z.string()),
      category: z.string().min(1, {
        message: "Por favor, selecciona una categoría.",
      }),
      restrictions: z.array(z.string()).optional(),
  })

