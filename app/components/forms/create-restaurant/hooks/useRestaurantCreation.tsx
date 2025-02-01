'use client' 
import { useEffect, useState } from "react"

export const useRestaurantCreation = () => {
const [isFinished, setIsFinished ] = useState(false)

    useEffect(() => {

        return () => {
            setIsFinished(false)
        }
    }, [])

    return { isFinished, setIsFinished }
}