import React from 'react';

const Pagination = ({ schedules, currentPage, onPageChange }) => {
  const pageCount = schedules.length;

  const handlePageChange = (pageIndex) => {
    let newPageIndex = pageIndex;

    // If pageIndex exceeds the last schedule, wrap back to the first schedule
    if (pageIndex >= pageCount) {
      newPageIndex = 0;
    }
    // If pageIndex is negative, wrap to the last schedule
    else if (pageIndex < 0) {
      newPageIndex = pageCount - 1;
    }

    onPageChange(newPageIndex);
  };

  return (
    <div className="pagination-container">
      {pageCount > 1 && (
        <div className="pagination">
          <button
            className={`pagination-item btn`}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &lt; {/* Left arrow */}
          </button>
          <button
            className={`pagination-item btn`}
            onClick={() => handlePageChange(currentPage)}
          >
            {`Schedule ${currentPage + 1}`}
          </button>
          <button
            className={`pagination-item btn`}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            &gt; {/* Right arrow */}
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
