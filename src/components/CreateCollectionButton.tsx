"use client";

import React, { useState } from 'react'
import { Button } from './ui/button';
import CreateCollectionSidebar from './CreateCollectionSidebar';

export const CreateCollectionButton = () => {

    const [open, setOpen] = useState(false);
    const handleOpenChange = (open: boolean) => setOpen(open);


    return (
        <div className='w-full rounded-md bg-gradient-to-r from-blue-500 via-lime-500 to-green-500 p-[1px]'>
            <Button
                variant={"outline"}
                className='dark:text-white w-full dark:bg-neutral-950 bg-white'
                onClick={() => setOpen(true)}
            >
                <span className='bg-gradient-to-r from-blue-600 to-lime-400 hover:to-lime-700 bg-clip-text text-transparent'>Create Collection</span>
            </Button>
            <CreateCollectionSidebar open={open} onOpenChange={handleOpenChange} />
        </div>
    )

}
