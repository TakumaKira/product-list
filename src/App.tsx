import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ImageOverlay from './components/ImageOverlay';

import Pagination from './components/Pagination';
import ProductList from './components/ProductList';
import SearchBox from './components/SearchBox';
import { getProducts } from './services/product';
import { Product } from './types/product';
import { State } from './types/state';
import { paginate } from './utils/paginate';
import { sanitizeUrls } from './utils/sanitizeUrls';

class App extends Component {
  state: State = {
    additionalImageUrls: [],
    currentPage: 1,
    gender: 'all',
    maxProductsPerPage: 100,
    products: [],
    searchQuery: '',
    showAdditionalImage: false,
  };

  async componentDidMount() {
    const products = await getProducts();
    this.setState({ products });
  }

  handleSearch = (query: string) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleGenderFilter = (gender: string) => {
    this.setState({ gender, currentPage: 1 });
  }

  handlePageChange = (page: number) => {
    this.setState({ currentPage: page });
  };

  handleProductClick = (product: Product) => {
    const urls = sanitizeUrls(product.additional_image_link);
    if (urls.length > 0) {
      this.setState({ showAdditionalImage: true, additionalImageUrls: urls });
    }
  };

  handleOverlayBgClick = () => {
    this.setState({ showAdditionalImage: false, additionalImageUrls: [] });
  };

  getFilteredProducts = () => {
    const {
      gender,
      products: allProducts,
      searchQuery,
    } = this.state;

    let filtered = allProducts;
    if (searchQuery) {
      filtered = allProducts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }
    if (gender !== 'all') {
      filtered = filtered.filter(p => p.gender === gender || p.gender === null);
    }

    return filtered;
  };

  render() {
    const {
      additionalImageUrls,
      currentPage,
      gender,
      maxProductsPerPage,
      searchQuery,
      showAdditionalImage,
    } = this.state;

    const filtered = this.getFilteredProducts();
    const paginated: Product[] = paginate(filtered, currentPage, maxProductsPerPage);

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '260px'}}>
            <DropdownButton id="dropdown-basic-button" title={`Filter by Gender (${gender})`}>
              <Dropdown.Item onClick={() => this.handleGenderFilter('all')} active={gender === 'all'}>All</Dropdown.Item>
              <Dropdown.Item onClick={() => this.handleGenderFilter('male')} active={gender === 'male'}>Male</Dropdown.Item>
              <Dropdown.Item onClick={() => this.handleGenderFilter('female')} active={gender === 'female'}>Female</Dropdown.Item>
              <Dropdown.Item onClick={() => this.handleGenderFilter('unisex')} active={gender === 'unisex'}>Unisex</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <ProductList products={paginated} onProductClick={this.handleProductClick} />
        <div className="row">
          <div className="col">
            <Pagination itemsCount={filtered.length} maxItemsPerPage={maxProductsPerPage} currentPage={currentPage} onPageChange={this.handlePageChange} />
          </div>
        </div>
        { showAdditionalImage ? <ImageOverlay additionalImageUrls={additionalImageUrls} onBgClick={this.handleOverlayBgClick} /> : null}
      </div>
    );
  }
}

export default App;
