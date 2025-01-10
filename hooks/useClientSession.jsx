'use client'

import { useEffect, useState } from "react"
import { createClient } from '@/utils/supabase/client'

export const useClientSession = () => {
    const [session, setSession] = useState(null)
    const [sessionError,  setSessionError] = useState(null)
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
    }, [])
    
    return {
        session,
        sessionError
    }
}