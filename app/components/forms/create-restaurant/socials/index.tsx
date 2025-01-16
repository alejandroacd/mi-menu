import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

export function Socials({ form }: any) {
  const handleSocialInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: any, name: string) => {
    let value = e.target.value;

    // Check for social media fields (facebook, instagram, twitter)
    if (name === 'facebook' || name === 'instagram' || name === 'twitter') {
      // If the value doesn't start with '/', prepend it
      if (value && !value.startsWith('/')) {
        value = '/' + value;
      }

      // Ensure the '/' can't be removed by the user
      field.onChange(value);
    } else {
      field.onChange(value);
    }
  };

  return (
    <div>
      <Label className='text-sm font-bold'>Redes Sociales</Label>
      <div className="space-y-4 mt-2">
        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center">
                  <Instagram className="mr-2 h-4 w-4 text-pink-600" />
                  <Input
                    placeholder="lospolloshermanos"
                    {...field}
                    onChange={(e) => handleSocialInputChange(e, field, 'instagram')}
                  />
                </div>
              </FormControl>
              <FormMessage className='mx-1 text-red-800' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="facebook"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center">
                  <Facebook className="mr-2 h-4 w-4 text-blue-600" />
                  <Input
                    placeholder="lospolloshermanos"
                    {...field}
                    onChange={(e) => handleSocialInputChange(e, field, 'facebook')}
                  />
                </div>
              </FormControl>
              <FormMessage className='mx-1 text-red-800' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="twitter"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center">
                  <Twitter className="mr-2 h-4 w-4 text-blue-400" />
                  <Input
                    placeholder="lospolloshermanos"
                    {...field}
                    onChange={(e) => handleSocialInputChange(e, field, 'twitter')}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
