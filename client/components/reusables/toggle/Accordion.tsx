"use client"
import Container from '@/components/reusables/contents/Container'
import Wrapper from '@/components/reusables/contents/Wrapper'
import React from 'react'
import { motion } from 'framer-motion'

const accordionData = [
    { title: "Accordion 1", content: "Content for Accordion 1" },
    { title: "Accordion 2", content: "Content for Accordion 2" },
    { title: "Accordion 3", content: "Content for Accordion 3" }
]

const Accordion = ({ multiOpen = true }) => {
    const [openAccordion, setOpenAccordion] = React.useState<boolean[]>(new Array(accordionData.length).fill(false))

    const toggleAccordion = (index: number) => {
        setOpenAccordion(prev =>
            prev.map((isOpen, i) => (i === index ? !isOpen : multiOpen && isOpen))
        )
    }
    return (
        <Wrapper>
            <Container>
                <h1 className="text-3xl font-bold">Frequently asked questions ?</h1>
                <div className="flex flex-col gap-4">
                    {accordionData.map((item, index) => (
                        <div key={index} className="bg-white p-4 border rounded-lg dark:bg-gray-800 dark:border-gray-700">
                            <div onClick={() => toggleAccordion(index)} className="flex justify-between items-center cursor-pointer">
                                <h5 className="text-2xl font-bold text-gray-900 dark:text-white">{item.title}</h5>
                                <motion.span
                                    animate={{ rotate: openAccordion[index] ? 45 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="h-6 w-6 bg-gray-200 rounded-full flex justify-center items-center"
                                >
                                    +
                                </motion.span>
                            </div>
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: openAccordion[index] ? 'auto' : 0, opacity: openAccordion[index] ? 1 : 0 }}
                                transition={{ duration: 0.3, ease: [0.04, 0.52, 0.23, 0.38] }}
                                className="overflow-hidden"
                            >
                                <p className="text-gray-700 dark:text-gray-400">{item.content}</p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </Container>
        </Wrapper>
    )
}

export default Accordion
