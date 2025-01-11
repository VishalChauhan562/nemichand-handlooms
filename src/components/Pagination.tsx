import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import "./Pagination.scss";
import { useAppSelector } from "../store/hooks";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
  limit: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  limit,
  onPageChange,
  className = "",
}) => {
  const { total } = useAppSelector((state) => state.product);

  const totalPages = Math.ceil(total / limit);

  const getPageNumbers = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === "number") {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination_conatiner">
      <nav className={`pagination ${className}`} aria-label="Pagination">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="pagination__nav-button"
          aria-label="First page"
        >
          <ChevronsLeft />
        </button>

        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination__nav-button"
          aria-label="Previous page"
        >
          <ChevronLeft />
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(page)}
            disabled={page === "..."}
            className={`pagination__button ${
              currentPage === page ? "pagination__button--active" : ""
            } ${page === "..." ? "pagination__button--dots" : ""}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className="pagination__nav-button"
          aria-label="Next page"
        >
          <ChevronRight />
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="pagination__nav-button"
          aria-label="Last page"
        >
          <ChevronsRight />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
