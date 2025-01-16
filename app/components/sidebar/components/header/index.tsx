import { Suspense, lazy } from "react"
import { Settings } from "lucide-react"
import { SidebarHeader } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
const SelectRestaurant = lazy(() => import("@/app/components/sidebar/components/select-restaurant"))
import { Restaurant } from "@/types"
import { createClient } from "@/utils/supabase/server"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { SpinnerLoader } from "@/app/components/spinner-loader"
const CreateRestaurantForm = lazy(() => import("@/app/components/forms/create-restaurant"))
export default async function SidebarHeaderContent() {
    const supabase = await createClient();
    const { data: session } = await supabase.auth.getSession();
    const userId = session?.session?.user?.id;

    if (!userId) {
        return <div>Error: User not authenticated</div>;
    }

    // Fetch the list of restaurants for the user
    const response = await fetch(`http://localhost:3000/api/restaurants?user_id=${userId}`, {
        next: {
            tags: ["restaurants"],
        }
    });

    const { data: restaurants } = await response.json();
    return (
        <SidebarHeader className="border flex flex-row items-center justify-between">
            <Suspense fallback={<SpinnerLoader />}>
                <SelectRestaurant restaurants={restaurants || []} />
            </Suspense>
            <div className="flex flex-row items-center gap-1">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="border">
                            <Plus size={24} />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden">
                        <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription>
                            </DialogDescription>
                        </DialogHeader>
                        <Suspense fallback={<div className="flex justify-center items-center w-100"><SpinnerLoader /></div>}>
                            <CreateRestaurantForm />
                        </Suspense>
                    </DialogContent>
                </Dialog>
                <Button variant={"ghost"} size="icon" className="border">
                    <Settings size={24} />
                </Button>
            </div>
        </SidebarHeader>
    );
}
