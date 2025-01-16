'use client'

import { useEffect, useState } from "react"
import { createClient } from '@/utils/supabase/client'
import { AuthError } from "@supabase/supabase-js"
import { Session } from "@supabase/supabase-js"
export const useClientSession = () => {
    const [session, setSession] = useState<Session | null>(null)
    const [sessionError,  setSessionError] = useState<AuthError | null>(null)
    const supabase = createClient()

    useEffect(() => {
        const getClientSession = async () => {
            const { data, error } = await supabase.auth.getSession()
            if (error) {
                console.log(error)
                setSessionError(error)
            } else {
                setSession(data.session)
            }
        }

        getClientSession()

        return () => {
            setSession(null)
            setSessionError(null)
        }
    }, [])
    
    return {
        session,
        sessionError
    }
}