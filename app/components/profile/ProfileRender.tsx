'use client'

import { useActiveRestaurantStore } from '@/utils/zustand/activeRestaurantStore'
import { Profile } from './index'
export default function ProfileRender() {
    const activeRestaurant = useActiveRestaurantStore(state => state.activeRestaurant)

    if (!activeRestaurant) {
        return null
    }
    return <Profile activeRestaurant={activeRestaurant} />
}