import ReactDOM from 'react-dom';
import Pagination from './Pagination';

let container: HTMLDivElement | null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container!);
  container = null;
});

test('does not render any button when there is only page', () => {
  ReactDOM.render(<Pagination itemsCount={1} maxItemsPerPage={1} currentPage={1} onPageChange={() => {}} />, container);
  const li = container!.querySelectorAll('li');
  expect(li.length).toBe(0);
});

for(let pagesCount = 2; pagesCount < 14; pagesCount++) {
  for (let currentPage = 1; currentPage <= pagesCount; currentPage++) {
    test(`renders ${Math.min(11, pagesCount)} buttons when there are ${pagesCount} pages and it is in ${currentPage} page`, () => {
      ReactDOM.render(<Pagination itemsCount={pagesCount} maxItemsPerPage={1} currentPage={currentPage} onPageChange={() => {}} />, container);
      const li = container!.querySelectorAll('li');
      expect(li.length).toBe(Math.min(11, pagesCount));
    });
  }
}