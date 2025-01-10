import FadeInContainer from '../fadein'
import { AuthCard } from './components/login-card'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
export default async function AuthPage({ className }: { className?: string }) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (data.user) {
    redirect('/dashboard')
  }
  return (

    <FadeInContainer className="flex justify-center  items-center h-screen">
      <AuthCard />
    </FadeInContainer>
  )
}