import React, { Component } from 'react';

import Pagination from './components/Pagination';
import ProductCard from './components/ProductCard';
import ProductList from './components/ProductList';
import SearchBox from './components/SearchBox';
import { getProducts } from './services/product';
import { Product } from './types/product';
import { State } from './types/state';
import { paginate } from './utils/paginate';

class App extends Component {
  state: State = {
    currentPage: 1,
    maxProductsPerPage: 100,
    products: [],
    searchQuery: '',
  };

  async componentDidMount() {
    const products = await getProducts();
    this.setState({ products });
  }

  handleSearch = (query: string) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handlePageChange = (page: number) => {
    this.setState({ currentPage: page });
  }

  getFilteredProducts = () => {
    const {
      products: allProducts,
      searchQuery,
    } = this.state;

    let filtered = allProducts;
    if (searchQuery) {
      filtered = allProducts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    return filtered;
  };

  render() {
    const {
      currentPage,
      maxProductsPerPage,
      searchQuery,
    } = this.state;

    const filtered = this.getFilteredProducts();
    const paginated: Product[] = paginate(filtered, currentPage, maxProductsPerPage);

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          </div>
        </div>
        <ProductList products={paginated} />
        <div className="row">
          <div className="col">
            <Pagination itemsCount={filtered.length} maxItemsPerPage={maxProductsPerPage} currentPage={currentPage} onPageChange={this.handlePageChange} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
