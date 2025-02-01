import {
  Sidebar,
  SidebarContent,
  SidebarSeparator,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { lazy, Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SidebarFooterContent } from "./components/footer";
import { createClient } from "@/utils/supabase/server";
import { SpinnerLoader } from "../spinner-loader";
import { Home, ShieldQuestion } from "lucide-react";
const RestaurantOptions = lazy(() => import("./components/restaurant-options"))
// Dynamic import for the header
const SidebarHeaderContent = dynamic(() => import("./components/header"));

export default async function SidebarComponent() {
  const supabase = await createClient()
  const { data: session } = await supabase.auth.getSession()
  return (
    <Sidebar>
      <SidebarContent className="bg-dark">
        <SidebarHeaderContent />
        <SidebarSeparator />
        {/* Inicio*/}
        <SidebarMenuItem className="hover:bg-muted flex px-2 flex-row " >
          <SidebarMenuButton asChild>
            <Link href={"/dashboard"}>
              <Home />
              <span className="text-md">Inicio</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
           
        <SidebarMenuItem className="hover:bg-muted flex px-2 flex-row" >
          <SidebarMenuButton asChild>
            <Link href={"/faq"}>
              <ShieldQuestion />
              <span className="text-md">FAQ</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>


        {/* items related to the restaurant or business selected selected*/}
        <Suspense fallback={<SpinnerLoader />}>
          <RestaurantOptions />
        </Suspense>
     

      </SidebarContent>
      {session && <SidebarFooterContent user={session as any} />}
    </Sidebar>
  );
}
