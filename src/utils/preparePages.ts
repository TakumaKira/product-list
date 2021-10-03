import range from 'lodash/range';

export const preparePages = (currentPage: number, pagesCount: number): (number | string)[] => {
  if (pagesCount < 12) {
    return range(1, pagesCount + 1);
  }
  if (currentPage < 7) {
    return [...range(1, 9), '...', pagesCount - 1, pagesCount];
  } else if (currentPage > pagesCount - 6) {
    return [1, 2, '...', ...range(pagesCount - 7, pagesCount + 1)];
  } else {
    return [1, 2, '...', currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, '...', pagesCount - 1, pagesCount];
  }
};
