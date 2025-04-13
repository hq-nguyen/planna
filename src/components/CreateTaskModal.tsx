import { Collection } from '@/generated/prisma';
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from './ui/dialog';
import { cn } from '@/lib/utils';
import { CollectionColor, CollectionColors } from '@/lib/constant';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { createTaskSchema, createTaskSchemaType } from '@/schema/createTask';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Textarea } from './ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { Button } from './ui/button';
import { Calendar1Icon } from 'lucide-react';
import { format } from 'date-fns';
import { IoReload } from "react-icons/io5";
import { createTask } from '@/actions/task';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Props {
  open: boolean;
  collection: Collection;
  setOpen: (open: boolean) => void;
}

function CreateTaskModal({ open, collection, setOpen }: Props) {

  const router = useRouter();

  const form = useForm<createTaskSchemaType>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      collectionId: collection.id,
    },
  });

  const openChangeState = (open: boolean) => {
    setOpen(open);
    form.reset();
  };

  const onsubmit = async (data: createTaskSchemaType) => {
    try {
      await createTask(data);
      toast.success("Task created successfully");
      openChangeState(false);
      router.refresh();
    } catch (error) {
      toast.error("Error when creating task");
      console.log("Error when creating task", error);
    }
  }


  return (
    <Dialog open={open} onOpenChange={openChangeState}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add task to collection: {" "}
            <span
              className={cn(
                "p-[1px] bg-clip-text text-transparent",
                CollectionColors[collection.color as CollectionColor]
              )}
            >
              {collection.name}
            </span>
          </DialogTitle>
          <DialogDescription>
            Add a task to your collection. You can add as many tasks as you want.
          </DialogDescription>
        </DialogHeader>

        <div className='gap-4 py-4'>
          <Form {...form}>
            <form
              className='space-y-4 flex flex-col'
              onSubmit={form.handleSubmit(onsubmit)}
            >
              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea rows={5} placeholder='Task content here' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              >
              </FormField>

              <FormField
                control={form.control}
                name='expiresAt'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expires at</FormLabel>
                    <FormDescription>When should this task expire?</FormDescription>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                            <Calendar1Icon className='mr-2 h-4 w-4' />
                            {field.value && format(field.value, "PPP")}
                            {!field.value && <span>No expiration</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar mode='single' selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>

                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              >
              </FormField>

            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button disabled={form.formState.isSubmitting} className={cn("w-full dark:text-white text-white",
            CollectionColors[collection.color as CollectionColor])}
            onClick={form.handleSubmit(onsubmit)}
          >
            Confirm
            {form.formState.isSubmitting && (
              <IoReload className='animate-spin w-4 h-4 ml-2' />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}

export default CreateTaskModal