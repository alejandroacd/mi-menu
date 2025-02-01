'use client'
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Restaurant } from "@/types";
import { Star } from "lucide-react";
import { useActiveRestaurantStore } from "@/utils/zustand/activeRestaurantStore";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
    const activeRestaurant = useActiveRestaurantStore(state => state.activeRestaurant)
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(activeRestaurant)

    return (
        <Card
            key={restaurant.id}
            className={`transition-all border-none hover:shadow-lg dark:hover:shadow-xl   flex flex-row items-center justify-between rounded-xl duration-300 cursor-pointer ${selectedRestaurant?.id === restaurant.id ? "ring-1 ring-purple-600/10 shadow-lg" : ""
                }`}
            onClick={() => setSelectedRestaurant(restaurant)}
        >
            <CardHeader className="items-center flex flex-row gap-3 w-full">
                <Image
                    alt="Logo"
                    width={80}
                    height={80}
                    className="rounded-sm "
                    src={restaurant?.avatar || "/foodplaceholder.jpg"} />
                <div className="flex  flex-wrap xl:flex-row justify-between p-1 w-full">
                   <div>
                   <CardTitle className="text-normal  mx-1 lg:text-lg flex items-center justify-between gap-2">
                        {restaurant.name}
                    </CardTitle>
                    <Badge className="text-[12px] " variant="secondary">Abierto</Badge>
                   </div>
                    <CardDescription className="my-1 flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                        2.3
                    </CardDescription>
                </div>

            </CardHeader>

        </Card>
    )
}