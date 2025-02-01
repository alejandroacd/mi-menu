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
  CardDescription,
  CardTitle
} from '@/components/ui/card'
import { OpenHours } from './open-hours'
import { useRouter } from 'next/navigation'
import { Socials } from './socials'
import { BasicInputs } from './basic-inputs'
import { handleAvatarChange } from './utils'
import { useRestaurantCreation } from './hooks/useRestaurantCreation'
import { Laugh, Sparkles } from 'lucide-react'
import { useActiveRestaurantStore } from '@/utils/zustand/activeRestaurantStore'
type FormValues = z.infer<typeof restaurantSchema>

export default function CreateRestaurantForm({ isEdit, closeDialog }: { isEdit: boolean, closeDialog: () => void }) {
  const { session } = useClientSession()
  const [avatar, setAvatar] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const { setActiveRestaurant, activeRestaurant, menuItems } = useActiveRestaurantStore()
  const { isFinished, setIsFinished } = useRestaurantCreation()
  const form = useForm<FormValues>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      avatar: isEdit ? activeRestaurant?.avatar ?? undefined : undefined,
      name: isEdit ? activeRestaurant?.name : '',
      description: isEdit ? activeRestaurant?.description : '',
      openHours: isEdit
        ? activeRestaurant?.open_hours?.map((oh) => ({
          day: oh.day,
          isOpen: Boolean(oh.isOpen),
          openTime: oh.openTime,
          closeTime: oh.closeTime,
        })) ?? daysOfWeek.map(day => ({ day, isOpen: false, openTime: '09:00', closeTime: '18:00' }))
        : daysOfWeek.map(day => ({ day, isOpen: false, openTime: '09:00', closeTime: '18:00' })),
      address: isEdit ? activeRestaurant?.address : '',
      email: isEdit ? activeRestaurant?.email : '',
      phone: isEdit ? activeRestaurant?.phone : '',
      facebook: isEdit ? activeRestaurant?.facebook : '',
      instagram: isEdit ? activeRestaurant?.instagram : '',
      twitter: isEdit ? activeRestaurant?.twitter : '',
      url: isEdit ? activeRestaurant?.url : '',
    },

  })
  useValidateUrl({ form, isEdit, originalUrl: activeRestaurant?.url })

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
        <CardTitle className='text-2xl'>Gracias.</CardTitle>
        {!isEdit && <CardDescription className='text-1xl'>Creaste con éxito tu negocio.</CardDescription>}          <div className='flex my-10  gap-3  fade-in'>
          <Sparkles className='w-14 mt-5 h-14 text-purple-500/60 flex-row-reverseellow-500' />
          <Laugh className='w-20 h-20 text-yellow-500/60' />
          <Sparkles className='w-12 lg:mt-26 h-12 text-purple-500/60 flex-row-reverseellow-500' />

        </div>
        {!isEdit && <Button className='w-fit clear-start my-5'> Creá tu primer producto :)</Button>}
        {isEdit && <Button className='w-fit clear-start my-5' onClick={closeDialog}> Volver </Button>}

      </section>
      }
      {!isFinished && <Form
        {...form}
      >
        <DialogHeader>
          <DialogTitle className='text-3xl text-center mr-6'>
            {!isEdit ? `Creá tu negocio` : `Editá tu negocio`}
          </DialogTitle>
          <DialogDescription className='text-1xl text-center'>
            {`Ingresá los detalles de tu negocio que verán tus clientes.
            Haz clic en ${!isEdit ? `"Crear"` : `"Guardar"`} al final para ${!isEdit ? `crear` : `actualizar`} tu negocio.`}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(() => handleSubmit({
            form: form,
            formData: {
              ...form.getValues(),
              user_id: session?.user.id,
              ...(activeRestaurant && { id: activeRestaurant.id, menu_items: activeRestaurant?.menu_items })
            },
            avatar: avatar,
            removeAvatar: removeAvatar,
            user_id: session?.user.id,
            setLoading: setLoading,
            setActiveRestaurant: setActiveRestaurant,
            setIsFinished: setIsFinished,
            isEdit: isEdit,
            menuItems
          }))}

          className="space-y-8 max-h-[60vh] px-1 w-[100%]  mx-auto overflow-y-auto">

          <SelectRestaurantAvatar
            avatar={avatar}
            handleAvatarChange={(e) => handleAvatarChange(e, setAvatar)}
            removeAvatar={removeAvatar}
            isEdit={isEdit}
          />

          <BasicInputs isEdit={isEdit} form={form} />

          <OpenHours
            form={form}
            daysOfWeek={daysOfWeek}
            isEdit={isEdit}
            fields={fields}
          />
          <Socials form={form} />

          <section className='flex'>
            {loading && <div className='flex justify-center w-full items-center'>
              <SpinnerLoader />
            </div>}
            {!loading && <Button disabled={loading} type="submit" className='w-fit ml-auto font-bold md:w-full' variant={'default'}>{!isEdit ? `Crear negocio` : `Guardar`}</Button>}
          </section>

        </form>
      </Form>}
    </>

  )
}

