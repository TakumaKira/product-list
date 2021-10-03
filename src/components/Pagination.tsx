import { preparePages } from "../utils/preparePages";

const Pagination = ({ itemsCount, maxItemsPerPage, currentPage, onPageChange }:
  { itemsCount: number, maxItemsPerPage: number, currentPage: number, onPageChange: Function }) => {
  const pagesCount = Math.ceil(itemsCount / maxItemsPerPage);
  if (pagesCount === 1) return null;  
  const pages = preparePages(currentPage, pagesCount);

  return (
    <nav>
      <ul className="pagination mx-auto" style={{width: 'fit-content'}}>
        {pages.map(page =>
          (page !== '...'
            ? <li
              key={page}
              className={page === currentPage ? "page-item active" : "page-item"}
              style={{width: '50px'}}
            >
              <a className="page-link" style={{textAlign: 'center'}} onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
            : <li
              key={page + Math.random()}
              className="page-item disabled"
              style={{width: '50px'}}
            >
              <a className="page-link" style={{textAlign: 'center'}}>
                {page}
              </a>
            </li>)
        )}
      </ul>
    </nav>
  );
};

export default Pagination;