import React, { useEffect, useState } from "react";
const items = Array.from({ length: 35 }, (_, i) => `Item ${i + 1}`);
const ShowMoreLessToggle = () => {
  const INITIAL_ITEMS_COUNT = 6;
  const [visibleCount, setVisibleCount] = useState(INITIAL_ITEMS_COUNT);
  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + INITIAL_ITEMS_COUNT);
  };

  const handleShowLess = () => {
    setVisibleCount((prev) => prev - INITIAL_ITEMS_COUNT);
  };

  const handleToggle = () => {
    if (showAll) {
      setVisibleCount(INITIAL_ITEMS_COUNT);
    } else {
      setVisibleCount((prev) => prev + INITIAL_ITEMS_COUNT);
    }
  };

  useEffect(() => {
    if (visibleCount >= items.length || visibleCount === items.length) {
      setShowAll(true);
    } else {
      setShowAll(false);
    }
  }, [visibleCount, items.length]);

  return (
    <div>
      <ul>
        {items.slice(0, visibleCount).map((item, index) => (
          <li key={index} style={{ color: "red" }}>
            {item}
          </li>
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
      {/*  <div className="flex-center gap-2  my-2">
          {visibleCount < items.length && !showAll && (
            <PrimaryButton onClick={handleShowMore}>Show More</PrimaryButton>
          )}

          {visibleCount > INITIAL_ITEMS_COUNT && (
            <PrimaryButton onClick={handleShowLess}>Show More</PrimaryButton>
          )}

          {visibleCount >= items.length && showAll && (
            <PrimaryButton
              className="bg-rose-500 hover:bg-red-300"
              onClick={handleToggle}
            >
              Show Less
            </PrimaryButton>
          )}
        </div> */}
    </div>
  );
};

export default ShowMoreLessToggle;
