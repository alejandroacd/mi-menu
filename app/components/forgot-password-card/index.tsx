'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FadeInContainer from "@/app/components/fadein"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailSchema } from './validator'
import { ForgotPasswordForm } from "./types"
import { handleResetPassword } from "./utils/action"

export default function ForgotPasswordCard() {
    const router = useRouter()
    const [serverError, setServerError] = useState<null | string>(null)
 
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{email: string}>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: '',
        }
    })

    const sentResetPasswordMail = async (form: ForgotPasswordForm)  => {
        try {
            const response = await handleResetPassword(form)
            if (response.error) {
                setServerError(response.message)
            } else {
                console.log(response)
            }
        } catch (error) {
            console.error('Error sending reset password email:', error)
        }
    }
    return (
        <FadeInContainer>
            <Card className="mx-auto dark ">
                <CardHeader>
                    <CardTitle>Cambiar contraseña</CardTitle>
                    <CardDescription>Te enviaremos un mail para poder resetear tu contraseña.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit((form) => sentResetPasswordMail(form))} >
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Tu email</Label>
                                <Input   id="email" placeholder="tucorreo@ejemplo.com" {...register('email')} 
                                />
                            </div>
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => router.back()} >Cancel</Button>
                    <Button type="submit">Enviar</Button>
                </CardFooter>
            </Card>
        </FadeInContainer>
    )
}