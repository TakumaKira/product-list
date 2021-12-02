import { preparePages } from "./paginate";

describe('preparePages', () => {
  test(`should return the same pages from 1 to pagesCount if pagesCount is less than 12`, () => {
    const pages = preparePages(1, 11);
    expect(pages).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  });
  test(`should return 11 elements truncated only at the 3rd from right most if pagesCount is greater than 11 and currentPage is less than 7`, () => {
    const pages = preparePages(1, 12);
    expect(pages).toEqual([1, 2, 3, 4, 5, 6, 7, 8, '...', 11, 12]);
  });
  test(`should return 11 elements truncated only at the 3rd from left most if pagesCount is greater than 11 and currentPage is greater than pagesCount-6`, () => {
    const pages = preparePages(12, 12);
    expect(pages).toEqual([1, 2, '...', 5, 6, 7, 8, 9, 10, 11, 12]);
  });
  test(`should return 11 elements truncated at the 3rd from left and right most if pagesCount is greater than 11 and currentPage is greater than 6 and less than pagesCount-5`, () => {
    const pages = preparePages(7, 13);
    expect(pages).toEqual([1, 2, '...', 5, 6, 7, 8, 9, '...', 12, 13]);
  });
});