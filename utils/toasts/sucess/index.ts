
export const SuccessToast = ({title, message, toast}: {title: string, message?: string, toast: any}) => {
  return toast({
    title: title,
    description: message
  })
}