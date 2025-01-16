import { inputs } from "./inputs"
import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form'
export function BasicInputs({ form }: any) {
    return (
        <>
            {inputs.map((input, index) => 
                 (
                    <FormField
                        key={index}
                        control={form.control}
                        name={input?.name}
                        defaultValue={input?.defaultValue}
                        render={({ field }) => (
                            <FormItem>
                                <Label className='text-sm  font-bold'>{input?.label}</Label>
                                <FormControl>
                                    <div>
                                    {input?.type === 'input' && <Input  placeholder={input?.placeholder} {...field} autoFocus />}
                                    {input?.type === 'textarea' && <Textarea placeholder={input?.placeholder} {...field} autoFocus />}
                                    </div>
                                </FormControl>
                                <FormMessage className='mx-1 text-red-800' />
                            </FormItem>
                        )}
                    />
                )
            )}
        </>
    )
}