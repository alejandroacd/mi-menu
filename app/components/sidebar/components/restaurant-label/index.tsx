import { SidebarGroupLabel } from "@/components/ui/sidebar"
  
export async function RestaurantName ({name}: {name: string}) {
    return <SidebarGroupLabel>{name}</SidebarGroupLabel>

}