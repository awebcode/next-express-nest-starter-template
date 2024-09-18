"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useClickAway } from '@uidotdev/usehooks';
import Menus from './Menus';

const MobileMenus = () => {
   
    const [isOpen, setIsOpen] = useState(false);

    // Framer Motion Variants for the menu
    const menuVariants = {
        open: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3 },
        },
        closed: {
            opacity: 0,
            x: '-100%',
            transition: { duration: 0.3 },
        },
    };
    const clickAwayRef=useClickAway<HTMLDivElement>(()=>{
        setIsOpen(false)
    })

    return (
        <>
            {/* Mobile Menu Button */}


            <Button
                size={"icon"}
                variant={"outline"}
                className="md:hidden p-2"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                {isOpen ? <XIcon className="h-6 w-6 text-primary" /> : <MenuIcon className="h-6 w-6 text-primary" />}
            </Button>




            {/* Mobile Menu (Framer Motion Animation) */}
            <motion.div
                ref={clickAwayRef}
                initial="closed"
                animate={isOpen ? 'open' : 'closed'}
                variants={menuVariants}
                className={`fixed top-0 left-0 w-3/4 h-screen bg-white dark:bg-black    z-50 shadow-2xl  p-6 md:hidden`}
            >
                {/* Close Button */} <Button
                    size={"icon"}
                    variant={"outline"}
                    className="absolute -right-[38px] top-10 bg-white/50 backdrop-blur-2xl"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen && <XIcon className="h-6 w-6 text-primary" />}
                </Button>

                <ul className="space-y-6">
                    <Menus />
                </ul>
            </motion.div>
        </>
    );
};

export default MobileMenus;
