import { lazy, Suspense } from "react"
import { SpinnerLoader } from "@/app/components/spinner-loader"
import {
    UtensilsCrossed,
    MenuIcon,
    FolderPlus,
    Sparkles,
    ArrowRight
} from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
const CreateRestaurantButton = lazy(() => import("@/app/dashboard/components/welcome-card/CreateRestaurantButton"))
export default async function WelcomeCard() {
    return (
        <Card className="w-full mb-12 lg:mb-0 ml-auto fade-in backdrop-blur-sm shadow-xl z-10">
            <CardHeader className="space-y-5">
                <CardTitle className="text-3xl  text-center">Empezamos?</CardTitle>
                <CardDescription className="text-center ">Crea tu obra maestra culinaria en 5 sencillos pasos</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
                <ol className="space-y-5 my-5">
                    {[
                        { icon: UtensilsCrossed, text: "Crea tu primer restaurante" },
                        { icon: MenuIcon, text: "Configura la estructura de tu menú" },
                        { icon: FolderPlus, text: "Añade categorías y platos a tu menú" },
                        { icon: Sparkles, text: "Personaliza el diseño de tu menú" },
                        { icon: ArrowRight, text: "Publica y comparte tu menú" }
                    ].map((step, index) => (
                        <div className={"flex flex-row  items-center gap-2"} key={index}>
                            <span className="flex items-center font-bold rounded-full ">
                                {index + 1}{')'}
                            </span>
                            <li className="flex items-center ">

                                <step.icon className="w-4 h-4 mx-1 mb-1 text-purple-600" />
                            </li>
                            <span className="">{step.text}</span>

                        </div>

                    ))}
                </ol>
            </CardContent>
            <CardFooter className="justify-center">
                <Suspense fallback={<SpinnerLoader />}>
                    <CreateRestaurantButton title="Creá un negocio!" />
                </Suspense>
            </CardFooter>
        </Card>

    )
}