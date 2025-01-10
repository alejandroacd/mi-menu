import { z } from "zod";

// Define the Zod schema for validation
export const authFormSchema = z.object({
  email: z.string().email("Introducí un email válido."),
  password: z.string().min(6, "La contraseña debe tener al menos 6 dígitos."),
  name: z.string().optional(), // Optional for login
  lastName: z.string().optional(), // Optional for login
});

export const signUpSchema = authFormSchema.extend({
  name: z.string().min(1, "El nombre es requerido."),
  lastName: z.string().min(1, "El apellido es requerido."),
});
