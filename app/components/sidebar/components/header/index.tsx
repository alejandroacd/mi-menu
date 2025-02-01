import { Suspense, lazy } from "react"
import { SidebarHeader } from "@/components/ui/sidebar"
const SelectRestaurant = lazy(() => import("@/app/components/sidebar/components/select-restaurant"))
import { createClient } from "@/utils/supabase/server"
import { SpinnerLoader } from "@/app/components/spinner-loader"
const CreateRestaurantButton = lazy(() => import("@/app/components/sidebar/components/create-restaurant-button"))
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
            <Suspense fallback={<SpinnerLoader />}>
                <CreateRestaurantButton />
            </Suspense>
        </SidebarHeader>
    );
}
