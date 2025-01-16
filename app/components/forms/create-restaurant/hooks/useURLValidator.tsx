import { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { UseFormReturn } from 'react-hook-form'
import debounce from 'lodash.debounce'

type UseValidateUrlProps = {
  form: UseFormReturn<any>
}

export function useValidateUrl({ form }: UseValidateUrlProps) {
  const supabase = createClient()

  useEffect(() => {
    const validateUrl = debounce(async (url: string) => {
      const urlPattern = /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/

      if (!urlPattern.test(url)) {
        form.setError('url', {
          type: 'manual',
          message: 'La URL solo puede contener letras minúsculas, números, guiones y guiones bajos, y no puede comenzar ni terminar con un guion o guion bajo.',
        })
        return
      }

      const { data, error } = await supabase
        .from('restaurants')
        .select('url')
        .eq('url', url)

      if (data && data.length > 0) {
        form.setError('url', {
          type: 'manual',
          message: 'Esta URL ya está en uso.',
        })
      } else {
        form.clearErrors('url')
      }
    }, 800) 

    const subscription = form.watch(({ url }) => {
      if (url) {
        validateUrl(url)
      }
    })

    return () => {
      subscription.unsubscribe()
      validateUrl.cancel()
    }
  }, [form, supabase])
}
