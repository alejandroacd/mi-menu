import { SidebarTrigger } from "@/components/ui/sidebar"
import { SwitchMode } from "../switch"
export async function DashboardHeader() {
    return (
        <div className="border-t-0 w-full  my-1 rounded-sm  flex items-center justify-between">
            <SidebarTrigger className="" />
            <SwitchMode />
        </div>
    )
}