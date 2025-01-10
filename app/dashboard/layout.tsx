import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import  SidebarComponent  from "../components/sidebar/index"
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <SidebarComponent />
            <main className="bg-black w-screen">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>

    )
}