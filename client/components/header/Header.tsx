import React from 'react'
import Menus from './Menus'
import ThemeToggle from './ThemeButton'
import MobileMenus from './MobileMenus'

const Header = () => {
    return (
        <header className='sticky top-0 z-50 bg-white/60 border-b border-primary backdrop-blur-2xl'>
            <div className="relative container max-w-7xl  h-16  mx-auto py-3 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex-between gap-4 ">
                    <div className="">
                        <h1 className='text-2xl md:text-5xl font-bold text-gray-900'>Starter</h1>
                    </div>

                    {/* Middle menus */}
                    <div className="hidden md:flex">
                        <Menus />


                    </div>
                    <div className="flex gap-4"> <div><MobileMenus /></div><ThemeToggle /></div>
                </div>


            </div>
        </header >
    )
}

export default Header