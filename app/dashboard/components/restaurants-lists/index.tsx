import { lazy, Suspense } from "react"
import { Restaurant } from "@/types"
import { Card, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { createClient } from "@/utils/supabase/server";
import { SpinnerLoader } from "@/app/components/spinner-loader";
const RestaurantCard = lazy(() => import("@/app/dashboard/components/restaurants-lists/restaurant-card"))
export default async function RestaurantsLists() {
    const supabase = await createClient()
    const { data: session } = await supabase.auth.getSession();
    const userId = session?.session?.user?.id;
    const response = await fetch(`http://localhost:3000/api/restaurants?user_id=${userId}`, {
        next: {
            tags: ["restaurants"],
        }
    });

    const { data: restaurants } = await response.json();
    if (!restaurants) {
        return <div className="flex justify-center my-12 items-center"><SpinnerLoader /></div>;
    }
    if (!userId) {
        return <div>Error: User not authenticated</div>;
    }
    return (
        <Card className="xl:p-4   flex flex-col p-3 shadow-xl  gap-5 " >
            <CardTitle className="text-2xl"><span className="font-bold text-purple-600/50">//</span> Tus negocios<span className="font-bold text-purple-600/50"> _</span></CardTitle>
            <ScrollArea>
                <div className="space-y-4">
                    {restaurants.map((restaurant: Restaurant) => (
                        <Suspense fallback={<SpinnerLoader key={restaurant.id} />}>
                            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                        </Suspense>
                    ))}
                </div>
            </ScrollArea>
        </Card>
    )
}