import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { CreateMenuItem } from "../../forms/create-item-menu"
import { MenuItem } from "@/types";
export default function EditMenuItem({ open, setOpen, activeItem }: { open: boolean, setOpen: (open: boolean) => void , activeItem: MenuItem}) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[600px] py-12 h-[95vh] max-h-[100vh] overflow-hidden">
                <VisuallyHidden.Root>
                <DialogHeader >
                    <DialogTitle></DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                </VisuallyHidden.Root>
                <CreateMenuItem  activeItem={activeItem} closeCreation={() => setOpen(false)} isEdit={true} />
            </DialogContent>
        </Dialog>
    )
}