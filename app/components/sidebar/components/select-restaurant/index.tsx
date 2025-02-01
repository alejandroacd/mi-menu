'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown, Store } from "lucide-react"
import Image from "next/image"
import { Restaurant } from "@/types"
import { useActiveRestaurantStore } from '@/utils/zustand/activeRestaurantStore'
export default function SelectRestaurant({ restaurants }: { restaurants: Restaurant[] }) {
    const { activeRestaurant, setActiveRestaurant } = useActiveRestaurantStore()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className='border'>
                <Button variant="ghost">
                    {activeRestaurant ? (
                        <div className="flex items-center">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                {!activeRestaurant?.avatar && null}
                                {activeRestaurant?.avatar && <Image src={activeRestaurant?.avatar} alt={activeRestaurant?.name} layout="fill" objectFit="cover" />
                                }                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3 mx-2">
                            <Store className=" text-purple-600" />
                        </div>
                    )}
                    <ChevronDown className="mx-1 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
                {restaurants?.map((restaurant: Restaurant) => (
                    <DropdownMenuItem key={restaurant.id} onSelect={() => setActiveRestaurant(restaurant)}>
                        <div className="flex items-center space-x-3">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden">
                                {!restaurant.avatar && null}
                                {restaurant.avatar && <Image src={restaurant.avatar} alt={restaurant.name} layout="fill" objectFit="cover" />}
                            </div>
                            <span>{restaurant.name}</span>
                        </div>
                    </DropdownMenuItem>
                ))}

            </DropdownMenuContent>
        </DropdownMenu>
    )
}