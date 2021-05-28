import React from 'react';
import './pagination.css';

const Pagination = ({ loading, numOfPage, paginate }) => {
  let paginationInfo = '';
  if (!loading) {
    const pages = numOfPage.pages;
    const pagesArray = [];

    if (pages) {
      for (var i = 1; i <= pages; i++) {
        pagesArray.push(i);
      }

      paginationInfo = (
        <div className="pagination-container">
          <ul className="pagination-items">
            {pagesArray.map((page) => (
              <li key={page} className="pagination-item">
                <a className="pagination" onClick={() => paginate(page)}>
                  {page}
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
  return paginationInfo;
};

export default Pagination;
