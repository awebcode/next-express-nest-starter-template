
"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { IoIosLaptop } from "react-icons/io"

const themeOptions = {
    light: <SunIcon className="icon-drop-shadow " />,
    dark: <MoonIcon className="icon-drop-shadow  " />,
    system: <IoIosLaptop className="icon-drop-shadow " />
}

const ThemeToggle = () => {
    const { setTheme, theme: currentTheme } = useTheme();
    const [isInitialRender, setIsInitialRender] = React.useState(false)
    React.useEffect(() => {
        setIsInitialRender(true)

    }, [])
    if (!isInitialRender) {
        return null
    }


    return (
        <div className="flex bg-gray-200/30 dark:bg-gray-50/20 rounded-2xl border border-gray-200/60 dark:border-gray-500/60 backdrop-blur-md">
            {Object.keys(themeOptions).map((theme) => (
                <motion.button
                    key={theme}
                    className={`text-black dark:text-white drop-shadow-2xl decoration-purple-100 flex-center p-2 rounded-2xl h-full  transition-colors  ${currentTheme === theme ? "bg-gray-200/60 dark:!bg-gray-100/20" : "hover:bg-gray-200/60 dark:hover:bg-gray-100/40"}`}
                    onClick={() => setTheme(theme)}

                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.90 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10, duration: 0.3 }}
                >
                    {themeOptions[theme as keyof typeof themeOptions]}
                </motion.button>
            ))}

        </div>
    )
}

export default ThemeToggle









// "use client"

// import * as React from "react"
// import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
// import { useTheme } from "next-themes"

// import { Button } from "@/components/ui/button"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { GrSystem } from "react-icons/gr"
// import { Check } from "lucide-react"



// export default function ThemeToggle() {
//     const { setTheme, theme: currentTheme, themes } = useTheme()

//     // Map theme to icon


//     // Extend themes array with icons
//     const themeOptions: Record<string, React.ReactNode> = {
//         light: <SunIcon className="mr-2 h-4 w-4 text-orange-400" />,
//         dark: <MoonIcon className="mr-2 h-4 w-4 text-green-400" />,
//         system: <GrSystem className="mr-2 h-4 w-4 text-blue-400" />
//     }
//     const getThemeIcon = (theme: string) => {
//         return themeOptions[theme];
//     }
//     return (
//         <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//                 <Button
//                     variant="outline"
//                     size="icon"
//                     className="text-paragraphrimary outline-none border-none focus:outline-none focus:border-none focus:bg-transparent hover:bg-transparent"
//                 >
//                     <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//                     <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//                     <span className="sr-only">Toggle theme</span>
//                 </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" >
//                 {themes.map((theme) => (
//                     <DropdownMenuItem
//                         key={theme}
//                         onClick={() => setTheme(theme)}
//                         className={`cursor-pointer rounded-md ${theme === currentTheme
//                             ? "bg-primary text-paragraphrimary-foreground"
//                             : "hover:bg-primary hover:text-paragraphrimary-foreground"
//                             }`}
//                     >
//                         {getThemeIcon(theme)}
//                         {theme}
//                         {theme === currentTheme && <Check className="mx-2 h-4 w-4" />}

//                     </DropdownMenuItem>
//                 ))}
//             </DropdownMenuContent>
//         </DropdownMenu>
//     )
// }
