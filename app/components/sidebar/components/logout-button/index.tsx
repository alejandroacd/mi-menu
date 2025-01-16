'use client'
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogClose,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { createClient } from "@/utils/supabase/client"
import { redirect } from 'next/navigation'

export const LogoutButton = ({ logoutTitle, logoutDescription, confirmText, cancelText }: { logoutTitle: string, logoutDescription: string, confirmText: string, cancelText: string }) => {
    const supabase = createClient()


    const logout = async () => {
        await supabase.auth.signOut()
        redirect('/')
    }   

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-fit ml-auto" variant="ghost">
                    <LogOut />
                </Button>
            </DialogTrigger>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle className="text-1xl lg:text-2xl">{logoutTitle}</DialogTitle>
                    <DialogDescription>
                        {logoutDescription}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="my-1 gap-2">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Volver
                        </Button>
                    </DialogClose>
                    <Button onClick={() => logout()}>{confirmText}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
