import React, { useState } from 'react';
const items = Array.from({ length: 35 }, (_, i) => `Item ${i + 1}`);
const ItemList = () => {
    const [visibleCount, setVisibleCount] = useState(10);
    const [showAll, setShowAll] = useState(false);

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 10);
    };

    const handleToggle = () => {
        if (showAll) {
            setVisibleCount(10);
        } else {
            setVisibleCount(items.length);
        }
        setShowAll((prev) => !prev);
    };

    return (
        <div>
            <ul>
                {items.slice(0, visibleCount).map((item, index) => (
                    <li key={index} style={{ color: "red" }}>{item}</li>
                ))}
            </ul>
            {visibleCount < items.length && !showAll && (
                <button onClick={handleShowMore}>Show More</button>
            )}
            {visibleCount >= items.length && showAll && (
                <button onClick={handleToggle}>See Less</button>
            )}
            {visibleCount < items.length && showAll && (
                <button onClick={handleToggle}>See Less</button>
            )}
        </div>
    );
};

export default ItemList;