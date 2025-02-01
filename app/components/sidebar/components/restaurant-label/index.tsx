'use client'
import { SidebarGroupLabel } from "@/components/ui/sidebar"
import { useActiveRestaurantStore } from "@/utils/zustand/activeRestaurantStore"
export default  function RestaurantName() {
    const name = useActiveRestaurantStore(state => state.activeRestaurant?.name)
    return <SidebarGroupLabel className="font-bold uppercase tracking-tighter" >{name}</SidebarGroupLabel>

}