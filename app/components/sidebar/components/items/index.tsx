'use client'
import {
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { Route } from "@/app/components/sidebar/types"
import Link from "next/link"
import { routes } from "@/app/navigation/routes"
import { useActiveRestaurantStore } from "@/utils/zustand/activeRestaurantStore"
export default function SidebarItems ()  {
  const activeRestaurant = useActiveRestaurantStore(state => state.activeRestaurant)
    return (
      <>
        {activeRestaurant && <SidebarGroupContent >
            <SidebarMenu className="my-2 gap-2">
              {routes.map((item: Route) => (
                <SidebarMenuItem  className="hover:bg-muted " key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon  />
                      <span className="text-md">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>}
      </>
      
    )
}