import { SidebarFooter } from "@/components/ui/sidebar"
import { LogoutButton } from "../logout-button"
import { User } from "@supabase/supabase-js"
export async function SidebarFooterContent({ user }: { user: User }) {
    return (
        <SidebarFooter className="flex justify-between flex-row items-center">
            <p className="text-sm mx-1 text-muted-foreground"> {user.email}</p>
            <LogoutButton
                logoutTitle="Cerrar sesión"
                logoutDescription="¿Estás seguro de querer cerrar sesión?"
                confirmText="Si, cerrar sesión"
                cancelText="Volver"
            />
        </SidebarFooter>
    )
}