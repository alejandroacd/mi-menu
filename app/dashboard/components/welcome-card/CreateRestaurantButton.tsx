'use client'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { lazy, Suspense } from "react"
import { SpinnerLoader } from "@/app/components/spinner-loader"
const CreateRestaurantForm = lazy(() => import("@/app/components/forms/create-restaurant"))
export const CreateRestaurantButton = ({title}: {title:string}) => {
    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button className="font-bold">
                <ArrowRight className="mr-2" /> {title}
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]  max-h-[90vh] overflow-hidden">
            <DialogHeader>
                <DialogTitle>

                </DialogTitle>
                <DialogDescription>
                </DialogDescription>
            </DialogHeader>
            <Suspense fallback={<div className="flex justify-center my-12 items-center">
                <SpinnerLoader />
            </div>}>
            <CreateRestaurantForm />
            </Suspense>
        </DialogContent>
    </Dialog>
    )
}