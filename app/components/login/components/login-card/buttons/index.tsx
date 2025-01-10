'use client'
import { CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { router } from "next/client"
interface ButtonsProps {
    isLogin: boolean
    toggleAuthMode: () => void
}

export const Buttons = ({ isLogin, toggleAuthMode }: ButtonsProps) => {
    return (
        <CardFooter className="flex justify-center flex-col">
                <p className="text-sm text-muted-foreground">
                    {isLogin ? "¿No tenés cuenta? " : "¿Ya tenés una cuenta? "}
                    <Button variant="link" className="p-0" onClick={toggleAuthMode}>
                        {isLogin ? 'Registrate' : 'Logueate :)'}
                    </Button>
                    
                </p>
                <p className="text-sm text-muted-foreground">
                    ¿Olvidaste tu contraseña?
                    <Button variant="link" className="mx-1 p-0" onClick={() => router.push('/forgot-password')}>
                        Recuperar contraseña
                    </Button>
                </p>
            </CardFooter>
    )
}