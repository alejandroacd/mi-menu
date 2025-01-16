'use client'
import { useRef, useState } from 'react'
import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { SpinnerLoader } from '../../spinner-loader'
import { handleSubmit } from './utils'
import { Form } from '@/components/ui/form'
import { DialogTitle, DialogDescription, DialogHeader } from '@/components/ui/dialog'
import { restaurantSchema } from './validator'
import { daysOfWeek } from './utils'
import { useClientSession } from '@/hooks/useClientSession'
import { useValidateUrl } from './hooks/useURLValidator'
import { SelectRestaurantAvatar } from './select-avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { OpenHours } from './open-hours'
import { Socials } from './socials'
import { BasicInputs } from './basic-inputs'
import { handleAvatarChange } from './utils'
import { useActiveRestaurantStore } from '@/utils/zustand/activeRestaurantStore'
import { useRestaurantCreation } from './hooks/useRestaurantCreation'
import { Laugh, Sparkles } from 'lucide-react'
import { Dots } from '../../dots'
type FormValues = z.infer<typeof restaurantSchema>

export default function CreateRestaurantForm() {
  const { session } = useClientSession()
  const [avatar, setAvatar] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const { setActiveRestaurant } = useActiveRestaurantStore()
  const { isFinished, setIsFinished } = useRestaurantCreation()
  const form = useForm<FormValues>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      avatar: undefined,
      name: '',
      description: '',
      openHours: daysOfWeek?.map(day => ({ day, isOpen: false, openTime: '09:00', closeTime: '18:00' })),
      address: '',
      email: '',
      phone: '',
      facebook: '',
      instagram: '',
      twitter: '',
      url: ''
    },
  })
  useValidateUrl({ form })

  const { fields } = useFieldArray({
    name: "openHours",
    control: form.control,
  })

  const removeAvatar = () => {
    setAvatar(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  return (
    <>
      {isFinished && <section className='flex w-full flex-col justify-self-center items-center'>
        <Card className='border-none px-12 flex justify-center flex-col items-center w-full'>
          <CardTitle className='text-2xl'> Felicidades!</CardTitle>
          <CardDescription className='text-1xl'>Creaste con éxito tu negocio.</CardDescription>
          <div className='flex my-10  gap-3  fade-in'>
            <Sparkles className='w-14 mt-5 h-14 text-purple-500/60 flex-row-reverseellow-500' />
            <Laugh className='w-20 h-20 text-yellow-500/60' />
            <Sparkles className='w-12 lg:mt-26 h-12 text-purple-500/60 flex-row-reverseellow-500' />

          </div>
          <Button className='w-fit clear-start my-5'> Creá tu primer producto :)</Button>
        </Card>

      </section>
      }
      {!isFinished && <Form
        {...form}
      >
        <DialogHeader>
          <DialogTitle className='text-3xl text-center mr-6'>
            Creá tu negocio
          </DialogTitle>
          <DialogDescription className='text-1xl text-center'>
          Ingresá los detalles de tu negocio que verán tus clientes.
          Haz clic en 'Crear' al final para crear tu negocio.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(() => handleSubmit({
            form: form,
            formData: { ...form.getValues(), 
            user_id: session?.user.id }, 
            avatar: avatar, removeAvatar, 
            user_id: session?.user.id, 
            setLoading, 
            setActiveRestaurant, 
            setIsFinished }))}
          className="space-y-8 max-h-[60vh] px-1 w-[100%]  mx-auto overflow-y-auto">

          <SelectRestaurantAvatar
            avatar={avatar}
            handleAvatarChange={(e) => handleAvatarChange(e, setAvatar)}
            removeAvatar={removeAvatar}
          />

          <BasicInputs form={form} />

          <OpenHours
            form={form}
            daysOfWeek={daysOfWeek}
            fields={fields}
          />
          <Socials form={form} />

          <section className='flex'>
            {loading && <div className='flex justify-center w-full items-center'>
              <SpinnerLoader />
            </div>}
            {!loading && <Button disabled={loading} type="submit" className='w-fit ml-auto font-bold md:w-full' variant={'default'}>Crear negocio</Button>}
          </section>

        </form>
      </Form>}
    </>

  )
}

