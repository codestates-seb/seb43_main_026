const Pagination = ({
  currentPage,
  pageSize,
  totalPosts,
  onPaginationClick,
}) => {
  const totalPages = Math.ceil(totalPosts / pageSize);

  const handlePageClick = (pageNumber) => {
    if (pageNumber !== currentPage) {
      onPaginationClick(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 10;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= halfVisiblePages) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (currentPage + halfVisiblePages >= totalPages) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - halfVisiblePages;
      endPage = currentPage + halfVisiblePages;
    }

    for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
      pageNumbers.push(
        <li>
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={pageNumber === currentPage ? 'active' : ''}
          >
            {pageNumber}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPaginationClick(currentPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPaginationClick(currentPage - 1);
    }
  };

  return (
    <div className="pagination">
      <ul>
        <li>
          <button
            onClick={handlePrevClick}
            className={currentPage === 1 ? 'disabled' : ''}
          >
            {`<`}
          </button>
        </li>
        {renderPageNumbers()}
        <li>
          <button
            onClick={handleNextClick}
            className={currentPage === totalPages ? 'disabled' : ''}
          >
            {`>`}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
