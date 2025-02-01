import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MenuItem } from "@/types"
import { Edit, Heart } from "lucide-react"
import { DeleteMenuItem } from "../delete-menu-item"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useActiveRestaurantStore } from "@/utils/zustand/activeRestaurantStore"
import { formatNumberWithDots } from "../utils"
interface MenuItemCardProps {
    menuItem: MenuItem
    handleSelectmenuItem: (menuItem: MenuItem) => void
}
export default function MenuItemCard({ menuItem, handleSelectmenuItem }: MenuItemCardProps) {
    const restaurantId = useActiveRestaurantStore((state) => state.activeRestaurant?.id)
    const currentMenuItems = useActiveRestaurantStore((state) => state.activeRestaurant?.menu_items)
    return (
        <div key={menuItem.id}>
            <Card className="w-full">
                <CardHeader className="relative">
                    <Image
                        src={menuItem.image || "/foodplaceholder.jpg"}
                        alt={menuItem.name}
                        width={300}
                        height={300}
                        className={`w-full h-52 lg:object-contain object-cover rounded-t-lg ${!menuItem.image ? 'opacity-80' : ''}`}
                    />
                    <CardTitle className="pt-6 text-2xl">{menuItem.name}</CardTitle>
                    <CardDescription>{menuItem.description}</CardDescription>
                    <Button
                        onClick={() => handleSelectmenuItem(menuItem)}
                        size="icon"
                        variant="outline"
                        className="absolute top-2 right-2">
                        <Edit className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">$ {formatNumberWithDots(menuItem.price.toString())}</p>
                    <div className="flex flex-row gap-3 flex-wrap my-6">
                        <Badge>{menuItem.category}</Badge>
                        {menuItem.restrictions.map((restriction) => (
                            <Badge key={restriction}>{restriction}</Badge>
                        ))}
                    </div>

                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" className="flex menuItems-center">
                        <Heart className="mr-2 h-4 w-4" />
                        <span>{menuItem.likes}</span>
                    </Button>
                    <DeleteMenuItem restaurantId={restaurantId || ''} menuItemId={menuItem.id || ''} menuItems={currentMenuItems} />
                </CardFooter>
            </Card>
        </div>
    )
}