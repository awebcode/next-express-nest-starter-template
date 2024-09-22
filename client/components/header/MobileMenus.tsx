"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useClickAway } from '@uidotdev/usehooks';
import MobileSidebar from './MobileSidebar';

const MobileMenus = () => {

    const [isOpen, setIsOpen] = useState(false);

    // Framer Motion Variants for the menu animation
    const menuVariants = {
        open: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: [0.04, 0.62, 0.23, 0.98], // Smooth easing for better feel
                bounce: 0.2, // Add a slight bounce effect
            },
        },
        closed: {
            opacity: 0,
            x: '-100%',
            scale: 0.95,
            transition: {
                duration: 0.3,
                ease: [0.33, 1, 0.68, 1], // Easing for a fast-out slow-in effect
            },
        },
    };



    const clickAwayRef = useClickAway<HTMLDivElement>(() => {
        setIsOpen(false);
    });

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
                {isOpen ? <XIcon className="h-6 w-6 text-paragraphrimary" /> : <MenuIcon className="h-6 w-6 text-paragraphrimary" />}
            </Button>

            {/* Backdrop for menu (adds a smooth fade-in overlay) */}


            {/* Mobile Menu (Framer Motion Animation) */}
            <motion.div
                ref={clickAwayRef}
                initial="closed"
                animate={isOpen ? 'open' : 'closed'}
                variants={menuVariants}
                className="fixed top-0 left-0 w-6/7 h-screen bg-white dark:bg-black z-50 shadow-2xl p-6 md:hidden"
            >
                {/* Close Button */} <Button
                    size={"icon"}
                    variant={"outline"}
                    className="absolute -right-[38px] top-10 bg-white/50 backdrop-blur-2xl"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen && <XIcon className="h-6 w-6 text-paragraphrimary" />}
                </Button>

                <ul className="space-y-6">
                    <MobileSidebar />
                </ul>
            </motion.div>
        </>
    );
};

export default MobileMenus;
