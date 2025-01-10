'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '../../../hooks/use-toast'
import { Camera } from 'lucide-react'

export function ProfileCompletionForm() {
  const [avatarUrl, setAvatarUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      fullName: formData.get('fullName') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      workPlace: formData.get('workPlace') as string,
      avatarUrl,
    }

    try {

        toast({
          title: 'Profile Updated',
          description: 'Your profile has been updated successfully.',
        })
        router.push('/dashboard') // Redirect to dashboard after successful update
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <form onSubmit={handleSubmit} className="w-1/2 dark  mx-auto border lg:my-24  dark rounded-lg shadow-xl">
      <div className="">
        <Label htmlFor="avatar" className="block text-sm font-medium">Avatar</Label>
        <div className="flex  justify-center">
          <div 
            className="w-32 h-32 rounded-full border-2 dark border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer relative"
            onClick={handleAvatarClick}
          >
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="Avatar preview"
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <Camera className="w-8 h-8 " />
            )}
            <input
              ref={fileInputRef}
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
              <span className="text-white text-sm">Change Avatar</span>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-12">
        <div>
          <Label htmlFor="fullName" className="block text-sm font-medium ">Full Name</Label>
          <Input 
            id="fullName" 
            name="fullName" 
            required 
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber" className="block text-sm font-medium ">Phone Number</Label>
          <Input 
            id="phoneNumber" 
            name="phoneNumber" 
            type="tel" 
            required 
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <Label htmlFor="workPlace" className="block text-sm font-medium ">Place of Work</Label>
          <Input 
            id="workPlace" 
            name="workPlace" 
            required 
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-indigo-600 mt-12 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 ease-in-out"
      >
        {isSubmitting ? 'Updating...' : 'Complete Profile'}
      </Button>
    </form>
  )
}

