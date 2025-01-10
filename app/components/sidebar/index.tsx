import { routes } from "@/app/navigation/routes"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup
} from "@/components/ui/sidebar"
import { RestaurantName } from "./components/restaurant-label";
import { SidebarItems } from "./components/items";
import { SidebarFooterContent } from "./components/footer";
export default function SidebarComponent() {
  return (

    <Sidebar >
      <SidebarContent >
        <SidebarGroup>
          <RestaurantName name="NOLA Gastropub" />
          <SidebarItems routes={routes} />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooterContent />
    </Sidebar>

  );
}