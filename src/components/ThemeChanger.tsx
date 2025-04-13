"use client";
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import { FaDesktop } from "react-icons/fa";

export const ThemeChanger = () => {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }
  return <Tabs defaultValue={theme}>
    <TabsList className='border dark:border-neutral-800 dark:bg-[#030303]'>
        <TabsTrigger value='light' onClick={() => setTheme("light")}>
            <MdOutlineWbSunny className='h-[1.2rem] w-[1.2rem]' />
        </TabsTrigger>
        <TabsTrigger value='dark' onClick={() => setTheme("dark")}>
            <IoMdMoon className='h-[1.2rem] w-[1.2rem] rotate-180 transition-all dark:rotate-0'/>
        </TabsTrigger>
        <TabsTrigger value='system' onClick={() => setTheme("system")}>
            <FaDesktop/> 
        </TabsTrigger>
    </TabsList>
  </Tabs>
}
