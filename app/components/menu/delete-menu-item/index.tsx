import { useState } from "react"
import { SpinnerLoader } from "../../spinner-loader"
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { MenuItem } from "@/types"
import { deleteMenuItemFromRestaurant } from "./action"
import { toast } from "@/hooks/use-toast"
import { useActiveRestaurantStore } from "@/utils/zustand/activeRestaurantStore"
interface DeleteMenuItemProps {
    restaurantId: string
    menuItemId: string 
    menuItems: MenuItem[] | undefined
}
export  function DeleteMenuItem({restaurantId, menuItemId, menuItems}: DeleteMenuItemProps) {
    const [loading, setLoading] = useState(false)
    const setActiveRestaurant = useActiveRestaurantStore((state) => state.setActiveRestaurant)
    const handleDelete = async () => {
        setLoading(true)
        try {
            const deletion = await deleteMenuItemFromRestaurant(restaurantId, menuItemId, menuItems ?? [])
            if (deletion && deletion.data) {
                toast({
                    title: `Tu producto se ha eliminado.`,
                })
                setActiveRestaurant(deletion.data[0])
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button className="w-fit ml-auto" variant="ghost">
                <Trash />
            </Button>
        </DialogTrigger>
        <DialogContent >
            <DialogHeader>
                <DialogTitle className="text-1xl lg:text-2xl">¿Estás seguro qué quieres eliminar producto?</DialogTitle>
                <DialogDescription>
                    Esta acción es irreversible.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className="my-1 gap-2">
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Volver
                    </Button>
                </DialogClose>
                {!loading && <Button onClick={handleDelete} type="button" className="bg-red-800/80" variant={"destructive"}>Si, eliminar</Button>}
                {loading && <SpinnerLoader />}
            </DialogFooter>
        </DialogContent>
    </Dialog>
    )
}