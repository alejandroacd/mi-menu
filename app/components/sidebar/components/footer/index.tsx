import { SidebarFooter } from "@/components/ui/sidebar"
import { LogoutButton } from "../logout-button"
export async function SidebarFooterContent() {

    return (
        <SidebarFooter className="flex justify-end">
            <LogoutButton
                logoutTitle="Cerrar sesión"
                logoutDescription="¿Estás seguro de querer cerrar sesión?"
                confirmText="Si, cerrar sesión"
                cancelText="Volver"
            />
        </SidebarFooter>
    )
}