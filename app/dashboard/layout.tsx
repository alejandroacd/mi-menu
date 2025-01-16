import { SidebarProvider } from "@/components/ui/sidebar"
import SidebarComponent from "../components/sidebar/index"
import { DashboardHeader } from "./components/dashboard-header"
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <SidebarComponent />
            <main className="w-full relative">          
            <div className="absolute
             w-[300px]
             z-1 h-[100px]
             lg:w-[300px] 
             lg:h-[300px] 
             bottom-0 
             right-[-50px] 
             lg:top-[350px] 
             lg:left-2/4 
             rounded-full  
             bg-gradient-to-r 
            from-blue-500
            to-purple-500 
             opacity-50
             lg:opacity-30 
             blur-3xl">
            </div>
            <div className="absolute w-[350px] z-[-1] h-[100px] lg:w-[300px] lg:h-[300px] bottom-0 lg:left-[400px]  lg:top-[150px]  rounded-full  bg-gradient-to-r from-purple-200 to-blue-500  opacity-50 lg:opacity-30 blur-3xl">
            </div>
                <DashboardHeader />
                {children}
            </main>
        </SidebarProvider>

    )
}