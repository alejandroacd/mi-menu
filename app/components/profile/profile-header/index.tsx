import { Restaurant } from "@/types"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
export default  function ProfileHeader ({activeRestaurant}: {activeRestaurant: Restaurant}) {
    return (
        <Card className="w-full my-3">
        <CardHeader className="flex flex-row items-center space-x-4">
          <img
            src={activeRestaurant.avatar || "foodplaceholder.jpg"}
            alt={"Logo"}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <CardTitle className="text-3xl font-bold "> {activeRestaurant.name}</CardTitle>
            <CardDescription className="my-3">{activeRestaurant.description}</CardDescription>
            <div className="flex items-center mt-2">
              <Star className="w-5 h-5 text-yellow-400 mr-1" />
              <span>4.7</span>
              <span className="mx-2">•</span>
              <span>1.2k reviews</span>
            </div>
          </div>
        </CardHeader>
      </Card>
    )
}