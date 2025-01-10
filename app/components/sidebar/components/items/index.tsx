import {
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { Route } from "@/app/components/sidebar/types"

export async function SidebarItems ({routes}: {routes: Route[]})  {
    return (
        <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((item: Route) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
    )
}