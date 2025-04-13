import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { useForm } from 'react-hook-form';
import { createCollectionSchema, CreateCollectionSchemaType } from '../schema/createCollection';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CollectionColor, CollectionColors } from '@/lib/constant';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { createCollection } from '@/actions/collection';
import { toast } from 'sonner';
import { IoReload } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

function CreateCollectionSidebar({ open, onOpenChange }: Props) {

    const form = useForm<CreateCollectionSchemaType>({
        resolver: zodResolver(createCollectionSchema),
        defaultValues: {},
    })

    const router = useRouter();

    const onSubmit = async (data: CreateCollectionSchemaType) => {
        try {
            await createCollection(data);
            openChangeState(false);
            router.refresh();
            toast("Collection created successfully", {
                description: "You can now add tasks to this collection.",
                duration: 4000,
            });
        } catch (e) {
            toast.error("Error when creating collection");
            console.log("Error when creating collection", e);
        }
    }

    const openChangeState = (open: boolean) => {
        form.reset();
        onOpenChange(open);
    };

    return (
        <Sheet open={open} onOpenChange={openChangeState}>
            <SheetContent className='flex p-4'>
                <SheetHeader className='flex flex-col gap-2'>
                    <SheetTitle>Add new Collection</SheetTitle>
                    <SheetDescription>
                        Collection are a way to group your tasks.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 flex flex-col'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Personal' {...field} />
                                    </FormControl>
                                    <FormDescription>Colection name</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={(color) => field.onChange(color)}>
                                            <SelectTrigger className={cn("w-full h-8 text-white", CollectionColors[field.value as CollectionColor])}>
                                                <SelectValue
                                                    placeholder="Select a color"
                                                    className="w-full h-8"
                                                />
                                            </SelectTrigger>
                                            <SelectContent className='w-full'>
                                                {Object.keys(CollectionColors).map(color => (
                                                    <SelectItem
                                                        key={color}
                                                        value={color}
                                                        className={cn(`w-full h-8 rounded-md my-1 p-2 text-white focus:text-white focus:font-bold focus-ring-2 ring-neutral-600 focus:ring-inset dark:focus:ring-white focus:px-8`,
                                                            CollectionColors[color as CollectionColor])}
                                                    >
                                                        {color}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>


                                    </FormControl>
                                    <FormDescription>Select a color for your collection</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </form>
                </Form>
                <div className='flex flex-col gap-4 mt-4'>
                    <Separator />
                    <Button
                        disabled={form.formState.isSubmitting}
                        variant={"outline"}
                        className={cn(
                            CollectionColors[form.watch("color") as CollectionColor],
                        )}
                        onClick={form.handleSubmit(onSubmit)}
                    >
                        Confirm
                        {form.formState.isSubmitting && (
                            <IoReload className='ml-2 h-4 w-4 animate-spin'/>
                        )}
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default CreateCollectionSidebar;