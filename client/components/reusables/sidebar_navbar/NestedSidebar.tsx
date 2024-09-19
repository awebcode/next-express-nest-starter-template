"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Home, ServerIcon, Webhook, Contact } from "lucide-react";
import { IoSchool } from "react-icons/io5";
import { useClickAway } from "@uidotdev/usehooks";
import { GrDetach } from "react-icons/gr";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger } from "../ui/navigation-menu";
import Link from "next/link";

interface MenuItem {
    label: string;
    href?: string;
    icon?: JSX.Element;
    subItems?: MenuItem[];
}

const nestedSidebarMenuData: MenuItem[] = [
    { label: "Home", href: "#home", icon: <Home /> },
    {
        label: "Services",
        icon: <ServerIcon />,
        subItems: [
            { label: "Web Development", href: "#web-dev", icon: <Webhook /> },
            {
                label: "Mobile Apps",
                subItems: [
                    { label: "iOS Development", href: "#ios", icon: <IoSchool />, subItems: [{ label: "Swift", href: "#swift", subItems: [{ label: "Swift V2", href: "#swiftv" }] }] },
                    { label: "Android Development", href: "#android", icon: <ChevronRight /> },
                ],
            },
        ],
    },
    { label: "About", href: "#about", icon: <GrDetach /> },
    { label: "Contact", href: "#contact", icon: <Contact /> },
];

const DropdownItem: React.FC<{ item: MenuItem; depthLevel: number }> = ({
    item,
    depthLevel,
}) => {
    depthLevel++;
    const [isOpen, setIsOpen] = useState(false);
    const hasSubItems = !!item.subItems;

    // Adjust padding based on nesting level
    const paddingLeft = `${depthLevel * 2}px`;

    return (
        <div className={`relative group  `}>
            <button
                className="relative flex items-center  gap-4  w-full text-left px-2 py-2  m-1 text-black dark:text-white focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="  flex items-center text-sm leading-8 tracking-wider gap-2 space-x-2" style={{ paddingLeft }}>
                    {item.icon}
                    <span>{item.label}</span>
                    {hasSubItems && (
                        <motion.span
                            className="ml-1  "
                            initial={{ rotate: 0 }}
                            animate={{ rotate: isOpen ? 180 : 0 }}
                        >
                            <ChevronDown size={14} />
                        </motion.span>
                    )}
                </span>

            </button>

            {hasSubItems && (
                <AnimatePresence mode="wait">
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1, width: "auto" }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ type: "tween", duration: 0.5 }}
                            style={{ paddingLeft }}
                            className={`relative  m-1 w-full border-l border-b  border-dashed border-primary   bg-white-50 dark:bg-black/50 text-black backdrop-blur-md shadow-md z-50 rounded-md group-hover:block`}
                        >
                            {item.subItems?.map((subItem) => (
                                <DropdownItem
                                    key={subItem.label}
                                    item={subItem}
                                    depthLevel={depthLevel}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
};

const NestedSidebar: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const clickOutsideRef = useClickAway<HTMLDivElement>(() => setIsSidebarOpen(false),);
    return (
        <div className="flex w-full ">
            {/* Sidebar */}
            <motion.div
                ref={clickOutsideRef}
                className=" h-screen"
                transition={{ type: "tween" }}
            >
                <NavigationMenu>
                    <NavigationMenuItem>  <NavigationMenuTrigger >Getting started</NavigationMenuTrigger>
                        <NavigationMenuContent className="p-4 w-40"> {nestedSidebarMenuData.map((item) => <Link key={item.label} href={item.href || "#"}> <p >{item.label}</p></Link>)}</NavigationMenuContent></NavigationMenuItem>
                </NavigationMenu>

                {/* Sidebar Header */}

                {/* Sidebar Content */}
                <AnimatePresence mode="wait">

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="px-4"
                    >
                        {nestedSidebarMenuData.map((item) => (
                            <DropdownItem key={item.label} item={item} depthLevel={0} />
                        ))}
                    </motion.div>

                </AnimatePresence>
            </motion.div>


        </div>
    );
};

export default NestedSidebar