import React, { useState } from "react";
import createPagination from "../services/createPagination";

import "./ClientePaginacion.css";

const ClientePaginacion = () => {
    
  const [currentPage, setCurrentPage] = useState(1);

  const { pagination } = createPagination({
    numberOfArticles: 37,
    articlesPerPage:8,
    numberOfButtons: 8,
    currentPage,
  });

  const handleClick = page => setCurrentPage(page);

  return (
    <div className="pagination">
      <ul>
        <li
          className={`${pagination[0] === currentPage && "disabled"}`}
          onClick={handleClick.bind(null, currentPage - 1)}
        >
          Prev
        </li>
        {pagination.map((page) => (
          <li
            className={`${currentPage === page && "active"}`}
            onClick={handleClick.bind(null, page)}
          >
            {page}
          </li>
        ))}
        <li
          className={`${pagination.reverse()[0] === currentPage && "disabled"}`}
          onClick={handleClick.bind(null, currentPage + 1)}
        >
          Next
        </li>
      </ul>
    </div>
  );
};

export default ClientePaginacion;
