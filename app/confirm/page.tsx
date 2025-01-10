import { Mail } from "lucide-react"
import { Card, CardTitle, CardHeader, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
const ConfirmPage = () => {
    return (
        <div className="bg-black h-screen relative flex items-center justify-center">
            <div className="absolute w-[300px]  z-1 h-[100px] lg:w-[300px] lg:h-[300px] bottom-0 right-[-50px] lg:top-2/4 lg:left-3/4 rounded-full  bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 lg:opacity-30 blur-3xl">
            </div>
            <div className="absolute w-[300px] z-1 h-[100px] lg:w-[300px] lg:h-[300px] bottom-0 left-[-50px]  lg:top-20 lg:right-20 rounded-full  bg-gradient-to-r from-purple-200 to-blue-500  opacity-50 lg:opacity-30 blur-3xl">
            </div>
            <Card className="dark md:w-1/4 w-3/4 h-auto">
                <CardHeader>
                    <Mail size={35} className="mx-auto my-3" />
                    <CardTitle className="text-3xl">Por favor, confirma tu cuenta.</CardTitle>
                </CardHeader>
                <CardContent>
                <CardDescription className="text-1xl">  
Hemos enviado un enlace de confirmación a tu dirección de correo. Por favor, revisa tu bandeja de entrada y haz clic en el enlace para activar tu cuenta.</CardDescription>
                </CardContent>

                <CardFooter>
            Si no ves el correo, revisa tu carpeta de spam. 
                </CardFooter>
            </Card>

        </div>
    )
}

export default ConfirmPage