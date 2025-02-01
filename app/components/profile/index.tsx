import { Suspense, lazy } from "react"
import { SpinnerLoader } from "../spinner-loader"
import { Card } from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Restaurant } from "@/types"
import ProfileHeader from "./profile-header"
import ProfileInfo from "./profile-info"
const RestaurantMenu = lazy(() => import("@/app/components/menu"))

export function Profile({activeRestaurant}: {activeRestaurant: Restaurant}) {
  return (
    <Tabs defaultValue="menu" className="lg:w-5/6 mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        {/* TABS OPTIONS!! */}
        <TabsTrigger value="menu">Menú</TabsTrigger>
        <TabsTrigger value="account">Información</TabsTrigger>
      </TabsList>

      {/* -----------------------------------------------------*/}
      <ProfileHeader activeRestaurant={activeRestaurant} />
      <TabsContent value="account">
       <ProfileInfo
       restaurant={activeRestaurant} />
      </TabsContent>
      <TabsContent value="menu">
        <Card className="p-2 lg:p-12">
          <Suspense fallback={<div className="flex justify-center h-screen items-center">
            <SpinnerLoader />
          </div>}>
            <RestaurantMenu />
          </Suspense>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
