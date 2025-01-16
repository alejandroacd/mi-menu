import {
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { Route } from "@/app/components/sidebar/types"

export async function SidebarItems ({routes}: {routes: Route[]})  {
    return (
        <SidebarGroupContent >
            <SidebarMenu className="my-2 gap-2">
              {routes.map((item: Route) => (
                <SidebarMenuItem  className="hover:bg-muted " key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon  />
                      <span className="text-md">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
    )
}