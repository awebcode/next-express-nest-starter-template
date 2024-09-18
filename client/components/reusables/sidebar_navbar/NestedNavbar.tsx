"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronDown, ChevronRight, Home, ServerIcon, Webhook, Contact } from "lucide-react";
import { IoClose, IoSchool } from "react-icons/io5";
import { AvatarIcon } from "@radix-ui/react-icons";

interface MenuItem {
    label: string;
    href?: string;
    icon?: JSX.Element;
    subItems?: MenuItem[];
}

const nestedSidebarMenuData: MenuItem[] = [
    { label: "Home", href: "#home", icon: <Home size={16} /> },
    {
        label: "Services",
        icon: <ServerIcon size={16} />,
        subItems: [
            { label: "Web Development", href: "#web-dev", icon: <Webhook size={16} /> },
            {
                label: "Mobile Apps",
                subItems: [
                    { label: "iOS Development", href: "#ios", icon: <IoSchool size={16} />, subItems: [{ label: "Swift", href: "#swift", subItems: [{ label: "Swift V2", href: "#swiftv" }] }] },
                    { label: "Android Development", href: "#android", icon: <ChevronRight size={16} /> },
                ],
            },
        ],
    },
    { label: "About", href: "#about", icon: <AvatarIcon /> },
    { label: "Contact", href: "#contact", icon: <Contact size={16} /> },
];

const DropdownItem: React.FC<{ item: MenuItem; depthLevel: number }> = ({
    item,
    depthLevel,
}) => {
    depthLevel++;
    const [isOpen, setIsOpen] = useState(false);
    const hasSubItems = !!item.subItems;

    // Adjust padding based on nesting level
    const paddingLeft = `${depthLevel * 10}px`;

    return (
        <div className="relative group">
            <button
                className="relative flex items-center justify-between w-full text-left px-4 py-2 text-white focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="flex items-center gap-2 space-x-2" style={{ paddingLeft }}>
                    {item.icon}
                    <span>{item.label}</span>
                </span>
                {hasSubItems && (
                    <motion.span
                        className="ml-2"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: isOpen ? 180 : 0 }}
                    >
                        <ChevronDown size={16} />
                    </motion.span>
                )}
            </button>

            {hasSubItems && (
                <AnimatePresence mode="wait">
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{ paddingLeft }}
                            className={`mt-1 w-full bg-black/50 text-black backdrop-blur-md shadow-lg z-50 rounded-md group-hover:block`}
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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex">
            {/* Sidebar */}
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: isSidebarOpen ? 250 : 50 }}
                className="bg-gray-800 text-white h-screen"
                transition={{ type: "tween" }}
            >
                <div className="p-4">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="text-white"
                    >
                        {isSidebarOpen ? <IoClose size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Sidebar Content */}
                <AnimatePresence mode="wait">
                    {isSidebarOpen && (
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
                    )}
                </AnimatePresence>
            </motion.div>


        </div>
    );
};

export default NestedSidebar;