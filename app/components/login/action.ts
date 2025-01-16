'use server'
import { AuthForm } from './types';
import { createClient } from '@/utils/supabase/server';
import { authFormSchema, signUpSchema } from './validators';
import { redirect } from 'next/navigation';

//login and signup auth
export const submitForm = async (
  form: AuthForm,
  isLogin: boolean
) => {
  const supabase = await createClient();
  if (!isLogin) {
    const newUserValidation = signUpSchema.safeParse(form);
    
    if (!newUserValidation.success) {
      console.log('Validation failed for new user:', newUserValidation.error);
      return {
        error: true,
        message: newUserValidation.error.issues[0].message ?? 'An error occurred',
      }
    }

    const { email, password, name, lastName } = form

    const { data: userData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options:{
        data: {
          name,
          lastName
        }
      }
    });

    if (signUpError) {
      console.log('Supabase sign-up error:', signUpError.message);
      return {
        error: true,
        message: signUpError.message,
      };
    }
    
    if (userData.user && userData.user.identities && userData.user.identities.length === 0) {
      return {
        error: true,
        message: "Email already in use",
      };
    }
    return {
      success: true,
      data: userData,
      message: "Check your email for the confirmation link",
    };

  }
  if (isLogin) {
    
    const loginUserValidation =  authFormSchema.safeParse(form);
    
    if (!loginUserValidation.success) {
      console.log('Validation failed for login:', loginUserValidation.error);
      return {
        error: true,
        message: loginUserValidation.error.issues[0].message ?? 'An error occurred',
      }
    }
  }

  const { email, password } = form
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log('Supabase login error:', error.message);
    return {
      error: true,
      message: error.message,
    };
  }

  if (!data.user) {
    return {
      error: true,
      message: "User not found",
    };
  }
  return {
    success: true,
    message: "Login successful",
    user: {
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata.name,
      lastName: data.user.user_metadata.lastName,
      isVerified: data.user.user_metadata.email_verified
    },
  };
}


// google auth
export const handleGoogleAuth = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `http://localhost:3000/auth/callback`,
    },
  })
  
  if (data.url) {
    redirect(data.url) // use the redirect API for your server framework
  }
  

  if (error) {
    console.log('Supabase Google login error:', error.message);
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Login successful",
  };
}
