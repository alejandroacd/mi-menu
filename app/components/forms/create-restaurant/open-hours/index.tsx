import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
    FormControl,
    FormField,
    FormItem
} from '@/components/ui/form'

export function OpenHours({ fields, form, daysOfWeek, isEdit }: any) {
    console.log(fields)
    return (
        <div className=''>
            <Label className='text-sm font-bold'>Horario de Apertura</Label>
            <div className="grid gap-2 lg:gap-4 mt-2 ">
                {fields?.map((day: any, index: number) => (
                    <div key={day.id || index} className="flex items-center justify-between space-x-1  overflow-x-hidden lg:space-x-5 ">
                        <FormField
                            control={form.control}
                            name={`openHours.${index}.isOpen`}
                            render={({ field }) => (
                                <FormItem className="flex items-center  space-x-5 my-1 ">
                                    <FormControl>
                                        <Checkbox
                                            className='mt-2'
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <Label className="w-24 mt-1 text-sm">{daysOfWeek[index]}</Label>
                                </FormItem>
                            )}
                        />
                        <div className='flex flex-row gap-2 md:gap-3'>
                            <FormField
                                control={form.control}
                                name={`openHours.${index}.openTime`}
                                render={({ field }) => (
                                    <FormItem >
                                        <FormControl>
                                            <Input
                                                type="time"
                                                className='w-fit px-1 lg:w-auto lg:px-2'
                                                {...field}
                                                disabled={!form.watch(`openHours.${index}.isOpen`)}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`openHours.${index}.closeTime`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className='w-fit px-1 lg:w-auto lg:px-2'
                                                type="time"
                                                {...field}
                                                disabled={!form.watch(`openHours.${index}.isOpen`)}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                    </div>
                ))}
            </div>
        </div>

    )
}