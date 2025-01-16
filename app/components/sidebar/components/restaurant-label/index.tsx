import { SidebarGroupLabel } from "@/components/ui/sidebar"
  
export async function RestaurantName ({name}: {name: string}) {
    return <SidebarGroupLabel className=" font-bold" >{name}</SidebarGroupLabel>

}