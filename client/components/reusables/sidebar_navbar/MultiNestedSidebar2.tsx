import React, { useState } from "react";
const categories = [
    {
        title: "Electronics",
        items: [
            {
                name: "Phones",
                subItems: [
                    { name: "Smartphones", subItems: ["iPhone", "Samsung Galaxy"] },
                    { name: "Feature Phones", subItems: ["Nokia", "Samsung"] },
                ],
            },
            {
                name: "Laptops",
                subItems: [
                    { name: "Gaming Laptops", subItems: ["Asus ROG", "MSI"] },
                    { name: "Ultrabooks", subItems: ["Dell XPS", "MacBook Air"] },
                ],
            },
        ],
    },
    {
        title: "Fashion",
        items: [
            {
                name: "Men",
                subItems: [
                    { name: "Shirts", subItems: ["Casual Shirts", "Formal Shirts"] },
                    { name: "Trousers", subItems: ["Jeans", "Chinos"] },
                ],
            },
            {
                name: "Women",
                subItems: [
                    { name: "Dresses", subItems: ["Evening Dresses", "Summer Dresses"] },
                    { name: "Tops", subItems: ["Blouses", "Tank Tops"] },
                ],
            },
        ],
    },
];

const SidebarItem = ({ item }: { item: { name: string; subItems?: any[] } }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="mb-2">
            <button
                className="w-full text-left px-4 py-2 font-medium text-gray-700 hover:bg-gray-200"
                onClick={toggleExpand}
            >
                {item.name}
            </button>
            {isExpanded && item.subItems && (
                <div className="pl-4">
                    {item.subItems.map((subItem, index) => (
                        <div key={index}>
                            {typeof subItem === "string" ? (
                                <p className="pl-4 text-gray-500">{subItem}</p>
                            ) : (
                                <SidebarItem item={subItem} />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const Sidebar = () => {
    const [activeCategory, setActiveCategory] = useState(null);

    const handleCategoryClick = (index: any) => {
        setActiveCategory(index === activeCategory ? null : index);
    };

    return (
        <div className="w-64 bg-gray-100 h-full p-4">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <div>
                {categories.map((category, index) => (
                    <div key={index}>
                        <button
                            className="w-full text-left px-4 py-2 font-medium text-gray-700 hover:bg-gray-200"
                            onClick={() => handleCategoryClick(index)}
                        >
                            {category.title}
                        </button>
                        {activeCategory === index && (
                            <div className="pl-4">
                                {category.items.map((item, itemIndex) => (
                                    <SidebarItem key={itemIndex} item={item} />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;