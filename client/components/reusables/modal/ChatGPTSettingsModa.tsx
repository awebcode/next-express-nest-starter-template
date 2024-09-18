"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Settings, User, Layout, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Importing Framer Motion
import {useClickAway} from "@uidotdev/usehooks"
export default function ChatGptSettingsModal() {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false); // Initialize as `false` (modal closed)
    const openModal = () => {
        setShowModal(true);

        router.push('#settings');
    };

    useEffect(() => {
        const hash = window.location.hash;
        if (hash.startsWith('#settings')) {
            setShowModal(true); // Open modal if #settings is in the URL
        } else {
            setShowModal(false); // Close modal if #settings is not in the URL
        }
    }, []);
    return (
        <div className="flex items-center justify-center h-screen">
            <button
                onClick={openModal}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Open Settings Modal
            </button>

            <AnimatePresence mode="wait">   {showModal && <Modal setShowModal={setShowModal} showModal={showModal} />} {/* Show the modal if the URL has #settings */}</AnimatePresence>
        </div>
    );
}

// modal




const TABS = [
    {
        id: "settings",
        label: "Settings",
        icon: Settings,
        content: <div>Content for Settings</div>,
    },
    {
        id: "personalization",
        label: "Personalization",
        icon: User,
        content: <div>Content for Personalization</div>,
    },
    {
        id: "layout",
        label: "Layout",
        icon: Layout,
        content: <div>Content for Layout</div>,
    },
    {
        id: "appearance",
        label: "Appearance",
        icon: Palette,
        content: <div>Content for Appearance</div>,
    },
];

const Modal = ({ setShowModal, showModal }: { showModal: boolean, setShowModal: (showModal: boolean) => void }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState(TABS[0].id);


    // Detect URL fragment and set the corresponding tab
    useEffect(() => {
        const updateTabFromHash = () => {
            const hash = window.location.hash;
            if (hash.startsWith("#settings")) {
                const tab = hash.split("/")[1] || TABS[0].id;
                setActiveTab(tab);
            }

        };

        // updateTabFromHash(); // Trigger the update on mount

        // window.addEventListener("hashchange", updateTabFromHash);

        // return () => {
        //     window.removeEventListener("hashchange", updateTabFromHash);
        // };

    }, []); //pathname

    // Handle tab click and update the fragment in the URL
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        router.push(`#settings/${tab}`);
    };
    console.log({ pathname })

    const closeModal = () => {
        setShowModal(false);
        // Use window.history.replaceState to update the URL without reloading the page
        window.history.replaceState(
            null,
            '',
            window.location.pathname + window.location.search // Keep the current pathname and search params
        );
    };

    const ref=useClickAway<HTMLDivElement>(() => { setShowModal(false); router.push("/") })

    return (
        <>
            <motion.div
                className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black  z-50 backdrop-blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    ref={ref}
                    className="bg-neutral-200 m-2 dark:bg-neutral-800 text-neutral-700 dark:text-white p-4 md:p-12 rounded-2xl ring-4 transition-all duration-300 ring-green-400 shadow-lg w-full max-w-4xl relative"
                    initial={{ x: 10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 10, opacity: 0 }}
                    transition={{ type: "tween", duration: 0.1 }}
                >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6 border-b  border-b-neutral-300 py-4">
                        <h2 className="text-2xl font-bold">
                            {activeTab.split("")[0].toLocaleUpperCase() + activeTab.slice(1)}
                        </h2>
                        <Button
                            size="icon"
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            &#x2715;
                        </Button>
                    </div>

                    <div className="flex">
                        {/* Left side: Vertical tabs */}
                        <div className="basis-1/4">
                            <ul className="space-y-2 flex flex-col gap-2">
                                {TABS.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <motion.button key={tab.id} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                            <button
                                                className={`text-sm md:text-lg flex px-3  md:px-6 py-2 md:py-3 items-center justify-start gap-2 rounded-lg  w-full ${activeTab === tab.id
                                                    ? " ring-2 ring-violet-600 bg-violet-500"
                                                    : "bg-violet-50 text-violet-600 hover:bg-violet-300"
                                                    }`}
                                                onClick={() => handleTabClick(tab.id)}
                                            >
                                                <Icon className="mr-2 " />
                                                <span>{tab.label}</span>
                                            </button>
                                        </motion.button>

                                    );
                                })}
                            </ul>
                        </div>

                        {/* Right side: Content based on active tab */}
                        <div className="w-3/4 p-4">
                            <AnimatePresence mode="wait">
                                {TABS.filter((tab) => tab.id === activeTab).map((tab) => (
                                    <motion.div
                                        key={tab.id}
                                        initial={{ opacity: 0, x: -15 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 15 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {tab.content}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
};
