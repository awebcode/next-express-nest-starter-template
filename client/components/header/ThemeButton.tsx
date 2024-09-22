"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GrSystem } from "react-icons/gr"
import { Check } from "lucide-react"



export default function ThemeToggle() {
    const { setTheme, theme: currentTheme, themes } = useTheme()

    // Map theme to icon


    // Extend themes array with icons
    const themeOptions: Record<string, React.ReactNode> = {
        light: <SunIcon className="mr-2 h-4 w-4 text-orange-400" />,
        dark: <MoonIcon className="mr-2 h-4 w-4 text-green-400" />,
        system: <GrSystem className="mr-2 h-4 w-4 text-blue-400" />
    }
    const getThemeIcon = (theme: string) => {
        return themeOptions[theme];
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="text-paragraphrimary outline-none border-none focus:outline-none focus:border-none focus:bg-transparent hover:bg-transparent"
                >
                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" >
                {themes.map((theme) => (
                    <DropdownMenuItem
                        key={theme}
                        onClick={() => setTheme(theme)}
                        className={`cursor-pointer rounded-md ${theme === currentTheme
                            ? "bg-primary text-paragraphrimary-foreground"
                            : "hover:bg-primary hover:text-paragraphrimary-foreground"
                            }`}
                    >
                        {getThemeIcon(theme)}
                        {theme}
                        {theme === currentTheme && <Check className="mx-2 h-4 w-4" />}

                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
