import React from 'react'
import ThemeToggle from './ThemeButton'
import MobileMenus from './MobileMenus'
import DesktopMenus from './DesktopMenus'
import BlurBg from '../reusables/contents/BlurBg'
import Link from 'next/link'

const Header = () => {
    return (
        <header className='sticky top-0 z-50 bg-white/50 dark:bg-gray-800/50 border-b border-primary backdrop-blur-2xl'>
            <BlurBg className='blur-3xl bg-purple-300 top-0 left-0' />
            <BlurBg  className='blur-3xl bg-pink-300 bottom-0 right-0'/>
            <div className="relative container max-w-7xl  h-16  mx-auto py-3 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex-between gap-4 ">
                    <Link href="/">
                        <h1 className='text-2xl md:text-3xl font-bold text-gray-900 cursor-pointer'>A</h1>
                    </Link>

                    {/* Middle menus */}
                    <div className="hidden md:flex">
                        <DesktopMenus />


                    </div>
                    <div className="flex gap-4"> <div><MobileMenus /></div><ThemeToggle /></div>
                </div>


            </div>
        </header >
    )
}

export default Header