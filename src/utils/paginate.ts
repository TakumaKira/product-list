import _ from 'lodash';

export function paginate(items: any[], currentPage: number, maxItemsPerPage: number): any[] {
  const startIndex = (currentPage - 1) * maxItemsPerPage;
  return _(items)
    .slice(startIndex)
    .take(maxItemsPerPage)
    .value();
}