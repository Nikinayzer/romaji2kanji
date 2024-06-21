import React from "react";
import "../styles/Pagination.css";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}) => {
  const pageNumbers:any[] = [];
  const maxPageNumbersToShow = 5;

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    const totalPageNumbers = pageNumbers.length;

    if (totalPageNumbers <= maxPageNumbersToShow) {
      return pageNumbers.map((number) => (
        <li key={number} className="page-item">
          <a
            onClick={() => paginate(number)}
            className="page-link"
            data-active={number === currentPage}
          >
            {number}
          </a>
        </li>
      ));
    }

    const currentPageIndex = pageNumbers.indexOf(currentPage);
    const startPage = Math.max(
      1,
      Math.min(currentPageIndex - 2, totalPageNumbers - maxPageNumbersToShow)
    );
    const endPage = Math.min(
      totalPageNumbers,
      startPage + maxPageNumbersToShow - 1
    );

    const pagesToShow = pageNumbers.slice(startPage - 1, endPage);

    return (
      <>
        {startPage > 1 && (
          <>
            <li key={1} className="page-item">
              <a
                onClick={() => paginate(1)}
                className="page-link"
                data-active={1 === currentPage}
              >
                1
              </a>
            </li>
            <li className="page-item">...</li>
          </>
        )}
        {pagesToShow.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => paginate(number)}
              className="page-link"
              data-active={number === currentPage}
            >
              {number}
            </a>
          </li>
        ))}
        {endPage < totalPageNumbers && (
          <>
            <li className="page-item">...</li>
            <li key={totalPageNumbers} className="page-item">
              <a
                onClick={() => paginate(totalPageNumbers)}
                className="page-link"
                data-active={totalPageNumbers === currentPage}
              >
                {totalPageNumbers}
              </a>
            </li>
          </>
        )}
      </>
    );
  };

  return (
    <nav>
      <ul className="pagination">{renderPageNumbers()}</ul>
    </nav>
  );
};

export default Pagination;
