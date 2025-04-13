import { Task } from '@/generated/prisma'
import React, { useTransition } from 'react'
import { Checkbox } from './ui/checkbox'
import { cn } from '@/lib/utils'
import { format, set } from 'date-fns';
import { setTaskCompleted } from '@/actions/task';
import { useRouter } from 'next/navigation';

function getExpirationColor(expiresAt: Date) {
    const days = Math.floor(expiresAt.getTime() - Date.now()) / 1000 / 60 / 60;

    if (days < 0) {
        return "text-gray-300 dark:text-gray-500";
    }

    if (days <= 3 * 24) {
        return "text-red-500 dark:text-red-400";
    }

    if (days <= 7 * 24) {
        return "text-green-500 dark:text-green-400";
    }
}

function TaskCard({ task }: { task: Task }) {

    const [isLoading, startTransition] = useTransition();
    const router = useRouter();

    return (
        <div className='flex items-start gap-2'>
            <Checkbox 
            disabled={task.completed || isLoading}
            onCheckedChange={() => {
                startTransition(async () => {
                    await setTaskCompleted(task.id);
                    router.refresh();
                })
            }} id={task.id.toString()} className='w-5 h-5' checked={task.completed} />
            <label htmlFor={task.id.toString()} className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 decoration-1 dark:decoration-white", task.completed && "line-through")}>
                {task.content}
                {task.expiresAt && (
                    <p
                        className={cn("text-xs text-neutral-500 dark:text-neutral-400",
                            getExpirationColor(task.expiresAt)
                        )}
                    >
                        {format(task.expiresAt, "dd/MM/yyyy")}
                    </p>
                )}
            </label>
        </div>
    )
}

export default TaskCard