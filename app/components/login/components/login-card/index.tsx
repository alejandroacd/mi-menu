'use client'
import { useState } from 'react'
import {
    Card,
} from "@/components/ui/card"
import { LoginCardHeader } from './header'
import { Form } from './form'
import { Buttons } from './buttons'

export const AuthCard = () => {

    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [serverError, setServerError] = useState<null | string>(null)
    const [loading, setLoading] = useState(false)

    const toggleAuthMode = () => {
        setIsLogin(!isLogin)
        setEmail('')
        setPassword('')
        setName('')
        setLastName('')
        setServerError(null)
    }

    return (
        <Card className='z-2 relative dark ' >
            {/* login card header */}
            <LoginCardHeader 
             title={isLogin ? 'Iniciá sesión :)' : 'Regístrate'}
             description={
             isLogin 
             ? 'Ingresá y empezá a gestionar tu menú!'
             : 'Creá una cuenta fácilmente completando el formulario y comenzá a digitalizar tu menú.'}
            />
            
            {/* inputs */}
            <Form
                isLogin={isLogin}
                email={email}
                password={password}
                name={name}
                lastName={lastName}
                serverError={serverError}
                loading={loading}
                setLoading={setLoading}
                setServerError={setServerError}
                setEmail={setEmail}
                setPassword={setPassword}
                setName={setName}
                setLastName={setLastName}
            />
            <p>
                
            </p>
            {/* buttons */}
            <Buttons isLogin={isLogin} toggleAuthMode={toggleAuthMode} />
        </Card>
    )
}