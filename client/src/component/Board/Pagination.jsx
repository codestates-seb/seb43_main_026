import styled from 'styled-components';

import { COLOR } from '../../style/theme';

const Container = styled.div`
  width: 100%;
  height: fit-content;
  margin: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const List = styled.li`
  button {
    font-weight: 500;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background-color: transparent;
    color: ${COLOR.main_dark_blue};
    margin: 0 2px;
    &.active {
      background-color: ${COLOR.main_blue};
      color: ${COLOR.bg};
    }
  }
`;

const Pagination = ({ currentPage, totalPosts, onPaginationClick }) => {
  const pageSize = 10;
  const totalPages = Math.ceil(totalPosts / pageSize);
  const maxVisiblePages = 10;
  const halfVisiblePages = Math.floor(maxVisiblePages / 2);

  const handlePageClick = async (pageNumber) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    await onPaginationClick(pageNumber, startIndex, endIndex);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
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
        <List key={pageNumber}>
          <button
            onClick={() => handlePageClick(pageNumber)}
            className={pageNumber === currentPage ? 'active' : ''}
          >
            {pageNumber}
          </button>
        </List>
      );
    }

    return pageNumbers;
  };

  const handleNextClick = async () => {
    if (currentPage < totalPages) {
      const startIndex = currentPage * pageSize;
      const endIndex = startIndex + pageSize;
      await onPaginationClick(currentPage + 1, startIndex, endIndex);
    }
  };

  const handlePrevClick = async () => {
    if (currentPage > 1) {
      const startIndex = (currentPage - 2) * pageSize;
      const endIndex = startIndex + pageSize;
      await onPaginationClick(currentPage - 1, startIndex, endIndex);
    }
  };

  return (
    <Container>
      <ul>
        <List>
          <button
            onClick={handlePrevClick}
            className={currentPage === 1 ? 'disabled' : ''}
          >
            {`<`}
          </button>
        </List>
        {renderPageNumbers()}
        <List>
          <button
            onClick={handleNextClick}
            className={currentPage === totalPages ? 'disabled' : ''}
          >
            {`>`}
          </button>
        </List>
      </ul>
    </Container>
  );
};

export default Pagination;
