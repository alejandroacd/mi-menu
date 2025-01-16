import { Button } from "@/components/ui/button"
import { Card,  CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Dots } from "./components/dots"
import  Link  from "next/link"
export default function NotFound() {
    return (
        <div className="relative h-screen w-full flex justify-center items-center">
            <Dots />
            <Card className="px-12 flex justify-center flex-col py-8">
                <CardContent>
                    <CardTitle className="text-2xl">
                        Esta página no existe :(
                    </CardTitle>
                    <CardDescription className="my-6">
                        ¿Querés volver al inicio?
                    </CardDescription>
                </CardContent>
                <Link className="mx-auto border" href="/">
                      <Button>
                      Ir al inicio
                      </Button>
                </Link>                       

            </Card>

        </div>
    )
}