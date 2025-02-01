import { SidebarGroup } from "@/components/ui/sidebar"
import RestaurantName from "../restaurant-label"
import SidebarItems from "../items"
export default function RestaurantOptions() {
    return (
            <SidebarGroup className="my-2">
                <RestaurantName />
                <SidebarItems />
            </SidebarGroup>

    )
}