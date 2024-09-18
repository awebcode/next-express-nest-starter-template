
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface CategoryItem {
    name: string;
    subItems?: CategoryItem[];
}

const categories: CategoryItem[] = [
    {
        name: "Electronics",
        subItems: [
            {
                name: "Phones",
                subItems: [{ name: "Smartphones" }, { name: "Feature Phones" }],
            },
            {
                name: "Laptops",
                subItems: [{ name: "Gaming Laptops" }, { name: "Ultrabooks" }],
            },
        ],
    },
    {
        name: "Fashion",
        subItems: [
            {
                name: "Men",
                subItems: [{ name: "Shirts" }, { name: "Trousers" }],
            },
            {
                name: "Women",
                subItems: [
                    {
                        name: "Dresses",
                        subItems: [{ name: "Casual" }, { name: "Formal" }],
                    },
                    { name: "Tops" },
                ],
            },
        ],
    },
];



// AmazonCategoriesOrFacebookNavigatio
const AmazonCategoriesOrFacebookNavigation: React.FC = () => {
    const [currentCategoryName, setCurrentCategoryName] = useState("");
    const [history, setHistory] = useState<Array<{ items: CategoryItem[]; activeItem: CategoryItem | null }>>([
        { items: categories, activeItem: null },
    ]);

    const handleItemClick = (item: CategoryItem) => {
        if (item.subItems) {
            setCurrentCategoryName(item.name);
            setHistory([...history, { items: item.subItems, activeItem: item }]);
        }
    };

    const handleBackClick = () => {
        if (history.length > 1) {
            const newHistory = history.slice(0, -1);
            setHistory(newHistory);

            // Find parent category name
            const parentCategoryName = newHistory[newHistory.length - 1].activeItem?.name || "";
            setCurrentCategoryName(parentCategoryName);
        }
    };

    const handleBreadcrumbClick = (index: number) => {
        const newHistory = history.slice(0, index + 1);
        setHistory(newHistory);
        setCurrentCategoryName(newHistory[index].activeItem?.name || "");
    };

    const getBreadcrumbTrail = () =>
        history.map((level, index) => ({
            name: level.activeItem?.name || "Categories",
            isLast: index === history.length - 1,
        }));

    const currentLevel = history[history.length - 1];
    const currentItems = currentLevel.items;

    return (
        <div className="relative min-w-80 max-w-[500px] m-4 bg-gray-100/30 backdrop-blur-lg rounded-xl ring-2 overflow-hidden h-full p-4">
            <h2 className="text-xl text-gray-700 font-semibold mb-4">
                Categories {currentCategoryName ? "- " + currentCategoryName : ""}
            </h2>

            {/* Breadcrumbs */}
            <Breadcrumbs
                breadcrumbTrail={getBreadcrumbTrail()}
                onBreadcrumbClick={handleBreadcrumbClick}
            />

            {/* Back button */}
            {history.length > 1 && (
                <button
                    className="w-full text-left px-4 py-2 font-medium text-blue-500 hover:bg-gray-200"
                    onClick={handleBackClick}
                >
                    <MoveLeftIcon className="inline-block mr-2" /> {currentCategoryName}
                </button>
            )}

            {/* Category List */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={history.length}
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "tween", duration: 0.2 }}
                    className="space-y-2"
                >
                    <CategoryList categories={currentItems} onItemClick={handleItemClick} />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
// Breadcrumb Component
const Breadcrumbs = ({
    breadcrumbTrail,
    onBreadcrumbClick,
}: {
    breadcrumbTrail: { name: string; isLast: boolean }[];
    onBreadcrumbClick: (index: number) => void;
}) => (
    <Breadcrumb>
        <BreadcrumbList>
            {breadcrumbTrail.length > 1 && breadcrumbTrail.map((crumb, index) => (
                <BreadcrumbItem key={index}>
                    <BreadcrumbLink
                        onClick={() => onBreadcrumbClick(index)}
                        className={
                            crumb.isLast
                                ? "cursor-not-allowed hover:text-inherit"
                                : "text-gray-600 hover:underline cursor-pointer"
                        }
                    >
                        {crumb.name}
                    </BreadcrumbLink>
                    {!crumb.isLast && (
                        <BreadcrumbSeparator className="text-gray-400" />
                    )}
                </BreadcrumbItem>
            ))}
        </BreadcrumbList>
    </Breadcrumb>
);

// CategoryList Component
const CategoryList = ({
    categories,
    onItemClick,
}: {
    categories: CategoryItem[];
    onItemClick: (item: CategoryItem) => void;
}) => (
    <>
        {categories.map((item, index) => (
            <button
                key={index}
                className="w-full text-left px-4 py-2 font-medium text-gray-700 hover:bg-gray-200"
                onClick={() => onItemClick(item)}
            >
                {item.name} {item.subItems && <MoveRightIcon size={16} className="inline-block ml-2" />}
            </button>
        ))}
    </>
);
export default AmazonCategoriesOrFacebookNavigation;