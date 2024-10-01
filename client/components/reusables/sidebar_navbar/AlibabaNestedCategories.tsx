"use client";
import React, { useState } from "react";
interface ICategories {
  name: string;
  subcategories: {
    title: string;
    images: {
      title: string;
      url: string;
    }[];
  }[];
}

// Example data for categories and subcategories with an array of images for each subcategory
const categories: ICategories[] = [
  {
    name: "Electronics",
    subcategories: [
      {
        title: "Mobile Phones",
        images: [
          { title: "iPhone 13", url: "/images/iphone13.jpg" },
          { title: "Samsung Galaxy S21", url: "/images/s21.jpg" },
        ],
      },
      {
        title: "Laptops",
        images: [
          { title: "MacBook Pro", url: "/images/macbook.jpg" },
          { title: "Dell XPS 13", url: "/images/xps13.jpg" },
        ],
      },
    ],
  },
  {
    name: "Fashion",
    subcategories: [
      {
        title: "Men's Clothing",
        images: [
          { title: "T-shirt", url: "/images/tshirt.jpg" },
          { title: "Jacket", url: "/images/jacket.jpg" },
        ],
      },
      {
        title: "Women's Clothing",
        images: [
          { title: "Dress", url: "/images/dress.jpg" },
          { title: "Skirt", url: "/images/skirt.jpg" },
        ],
      },
    ],
  },
];

const AlibabaNestedCategoryModal = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]); // Default to first category
  const [activeSubcategory, setActiveSubcategory] = useState(
    activeCategory.subcategories[0]
  ); // Default to first subcategory

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>

      <div className="flex">
        {/* Main Categories List (Left Column) */}
        <div className="w-1/4 border-r">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`p-4 cursor-pointer ${
                category.name === activeCategory.name ? "bg-gray-200" : ""
              }`}
              onMouseEnter={() => {
                setActiveCategory(category);
                setActiveSubcategory(category.subcategories[0]); // Reset to the first subcategory when switching category
              }}
            >
              <h2 className="text-lg font-semibold">{category.name}</h2>
            </div>
          ))}
        </div>

        {/* Subcategories (Middle Column) */}
        <div className="w-1/4 border-r p-4">
          <h2 className="text-xl font-bold mb-4">{activeCategory.name}</h2>
          <div className="flex flex-col">
            {activeCategory.subcategories.map((subcategory) => (
              <div
                key={subcategory.title}
                className={`p-2 cursor-pointer ${
                  subcategory.title === activeSubcategory.title ? "bg-gray-300" : ""
                }`}
                onMouseEnter={() => setActiveSubcategory(subcategory)}
              >
                <h3 className="text-md font-medium">{subcategory.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Subcategory Details (Right Column) with Multiple Images */}
        <div className="w-2/4 p-4">
          <h2 className="text-xl font-bold mb-4">{activeSubcategory.title} Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {activeSubcategory.images.map((image, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-32 object-cover mb-2 rounded"
                />
                <h3 className="text-md font-medium text-center">{image.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlibabaNestedCategoryModal;
