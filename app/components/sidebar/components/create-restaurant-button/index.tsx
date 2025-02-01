'use client'
import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { SpinnerLoader } from '@/app/components/spinner-loader'
import { lazy, Suspense } from 'react'
import { useActiveRestaurantStore } from '@/utils/zustand/activeRestaurantStore'
const CreateRestaurantForm = lazy(() => import("@/app/components/forms/create-restaurant"))
export default function CreateRestaurantButton() {
    const activeRestaurant = useActiveRestaurantStore(state => state.activeRestaurant)
    const [isOpen, setIsOpen] = useState(false)
    const closeDialog = () => setIsOpen(false)

    return (
        <div className="flex flex-row items-center gap-1">
            <Dialog open={isOpen} onOpenChange={setIsOpen} >
                <DialogTrigger disabled={!activeRestaurant} asChild>
                    <Button variant="ghost" size="icon" className="border">
                        <Pencil size={24} />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden">
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <Suspense fallback={<div className="flex justify-center items-center w-100"><SpinnerLoader /></div>}>
                        <CreateRestaurantForm isEdit={true} closeDialog={closeDialog} />
                    </Suspense>
                </DialogContent>
            </Dialog>

        </div>
    )
}