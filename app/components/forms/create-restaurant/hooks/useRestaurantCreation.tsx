'use client' 
import { useEffect, useState } from "react"

export const useRestaurantCreation = () => {
const [isFinished, setIsFinished ] = useState(true)

    useEffect(() => {

        return () => {
            setIsFinished(false)
        }
    }, [])

    return { isFinished, setIsFinished }
}