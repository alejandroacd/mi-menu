import { Restaurant } from "@/types";
import { routes } from "@/app/navigation/routes";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
} from "@/components/ui/sidebar";
import dynamic from "next/dynamic";
import { SidebarItems } from "./components/items";
import { RestaurantName } from "./components/restaurant-label";
import { SidebarFooterContent } from "./components/footer";
import { createClient } from "@/utils/supabase/server";
import { Session, User } from "@supabase/supabase-js";

// Dynamic import for the header
const SidebarHeaderContent = dynamic(() => import("./components/header"));

export default async function SidebarComponent() {
  const supabase = await createClient()
  const { data: session } = await supabase.auth.getSession()
  return (
    <Sidebar>
      <SidebarContent className="bg-dark">
        <SidebarHeaderContent  />
        <SidebarGroup className="my-2">
          <RestaurantName name="Restaurante" />
          <SidebarItems routes={routes} />
        </SidebarGroup>
      </SidebarContent>
      {session && <SidebarFooterContent user={session as any} />}
    </Sidebar>
  );
}
