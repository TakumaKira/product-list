import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ToggleButton from 'react-bootstrap/ToggleButton';

import ImageOverlay from './components/ImageOverlay';
import Pagination from './components/Pagination';
import ProductList from './components/ProductList';
import SearchBox from './components/SearchBox';
import { getProducts } from './services/product';
import { Product } from './types/product';
import { initialState, State } from './types/state';
import { paginate } from './utils/paginate';
import { sanitizeUrls } from './utils/sanitizeUrls';

class App extends Component {
  state: State = initialState;
  cachedImages: { [url in string]: HTMLImageElement } = {};

  async componentDidMount() {
    const products = await getProducts();
    this.setState({ products });
  }

  handleSearch = (query: string) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleGenderFilter = (gender: string) => {
    this.setState({ gender, currentPage: 1 });
  };

  handleSaleFilter = (filterBySale: boolean) => {
    this.setState({ filterBySale, currentPage: 1 });
  };

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
      filterBySale,
      gender,
      products: allProducts,
      searchQuery,
    } = this.state;

    let filtered = allProducts;
    if (searchQuery) {
      filtered = allProducts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }
    if (gender !== 'all') {
      filtered = filtered.filter(p => p.gender === gender);
    }
    if (filterBySale) {
      filtered = filtered.filter(p => p.price > p.sale_price);
    }

    return filtered;
  };

  render() {
    const {
      additionalImageUrls,
      currentPage,
      filterBySale,
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
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '150px'}}>
            <ToggleButton
              id="toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={filterBySale}
              value="1"
              onChange={(e) => this.handleSaleFilter(e.currentTarget.checked)}
            >
            Filter by Sale
          </ToggleButton>          </div>
        </div>
        <ProductList products={paginated} onProductClick={this.handleProductClick} cachedImages={this.cachedImages} />
        <div className="row">
          <div className="col">
            <Pagination itemsCount={filtered.length} maxItemsPerPage={maxProductsPerPage} currentPage={currentPage} onPageChange={this.handlePageChange} />
          </div>
        </div>
        { showAdditionalImage ? <ImageOverlay additionalImageUrls={additionalImageUrls} onBgClick={this.handleOverlayBgClick} cachedImages={this.cachedImages} /> : null}
      </div>
    );
  }
}

export default App;
