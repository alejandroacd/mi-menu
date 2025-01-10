'use server'
import { createClient } from '@/utils/supabase/server'
import { emailSchema } from '../validator'


export const handleResetPassword = async (data: {email: string}) => {
    const { email } = data
    const supabase = await createClient()
    const emailValidation = emailSchema.safeParse(email)
    
    if (!emailValidation.success) {
        return {
            error: true,
            message: emailValidation.error.issues[0].message ?? 'An error occurred'
        }
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    console.log("errorcillo: ", error);
  
    if (error) {
      return {
        error: true,
        message: error.message,
      };
    }

    return {
        success: true,
        message:
          "If an account exists, a password reset email has been sent. Please check your inbox.",
      }
}

