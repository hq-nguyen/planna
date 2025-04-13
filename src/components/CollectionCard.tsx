"use client";

import { Collection, Task } from '@/generated/prisma';
import React, { useMemo, useState, useTransition } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { CollectionColor, CollectionColors } from '@/lib/constant';
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { deleteCollection } from '@/actions/collection';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import CreateTaskModal from './CreateTaskModal';
import TaskCard from './TaskCard';

interface Props {
    collection: Collection & {
        tasks: Task[];
    }
}

function CollectionCard({ collection }: Props) {
    const [isOpen, setIsOpen] = useState(true);
    const router = useRouter();

    const [openModal, setOpenModal] = useState(false);

    const tasks = collection.tasks;

    const [isLoading, startTransition] = useTransition();

    const removeCollection = async () => {
        try {
            await deleteCollection(collection.id);
            router.refresh()
            toast.success("Collection deleted successfully");
        } catch (error) {
            toast.error("Error when deleting collection");
            console.log("Error when deleting collection", error);
        }
    }

    const totalTasks = collection.tasks.length; 
    const tasksDone = useMemo(() => {
        return collection.tasks.filter((task) => task.completed).length;
    }, [collection.tasks])

    const progress = totalTasks === 0 ? 0 : (tasksDone / totalTasks) * 100; 

    return (
        <>
            <CreateTaskModal
                open={openModal}
                setOpen={setOpenModal}
                collection={collection}
            />
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger asChild>
                    <Button
                        variant={"ghost"}
                        className={cn("flex w-full justify-between p-6",
                            isOpen && "rounder-b-none",
                            CollectionColors[collection.color as CollectionColor])
                        }
                    >
                        <div className='w-full flex items-center justify-between gap-2'>
                            <span className='text-white font-bold'>{collection.name}</span>
                            {!isOpen && <FaSortDown className='text-white mb-2' />}
                            {isOpen && <FaSortUp className='text-white mt-2' />}
                        </div>
                    </Button>
                </CollapsibleTrigger>

                <CollapsibleContent className='flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg'>
                    {tasks.length === 0 && (
                        <Button variant={"ghost"} className='flex items-center justify-center gap-2 p-8 py-12 rounded-none'
                            onClick={() => setOpenModal(true)}
                        >
                            <p>There are no tasks yet.</p>
                            <span className={cn("text-sm bg-clip-text text-transparent", CollectionColors[collection.color as CollectionColor])}>Create one</span>
                        </Button>
                    )}
                    {
                        tasks.length > 0 && (
                            <>
                                <Progress className='rounded-none' value={progress} />
                                <div className='p-4 gap-3 flex flex-col'>
                                    {tasks.map((task) => (
                                        <TaskCard key={task.id} task={task} />
                                    ))}
                                </div>
                            </>
                        )}
                    <Separator />
                    <footer className='h-[40px] px-4 p-[2px] text-xs text-neutral-500 flex justify-between items-center'>
                        <p>Create at {collection.createdAt.toLocaleDateString("en-US")}</p>
                        {isLoading && (
                            <div>Deleting...</div>
                        )}
                        {!isLoading && (
                            <div>
                                <Button variant={"ghost"} className='w-4 h-4' onClick={() => setOpenModal(true)}>
                                    <AiOutlinePlus />
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant={"ghost"} className='w-4 h-4 '>
                                            <CiTrash />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>This action cannot be undone. This will clear your collection and all task inside it.</AlertDialogDescription>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => { startTransition(removeCollection) }}>Proceed</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        )}

                    </footer>
                </CollapsibleContent>

            </Collapsible>
        </>
    )

}

export default CollectionCard