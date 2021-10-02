import React, { Component } from 'react';

import ProductCard from './components/ProductCard';
import SearchBox from './components/SearchBox';
import { getProducts } from './services/product';
import './App.css';
import { State } from './types/state';

class App extends Component {
  state: State = {
    maxProducts: 100,
    products: [],
    searchQuery: '',
  };

  async componentDidMount() {
    const products = await getProducts();
    this.setState({ products });
  }

  handleSearch = (query: string) => {
    this.setState({ searchQuery: query });
  };

  getFilteredProducts = () => {
    const {
      maxProducts,
      products: allProducts,
      searchQuery,
    } = this.state;

    let filtered = allProducts;
    if (searchQuery) {
      filtered = allProducts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (filtered.length > maxProducts) {
      filtered = filtered.slice(0, maxProducts);
    }

    return filtered;
  };

  render() {
    const {
      searchQuery,
    } = this.state;

    const products = this.getFilteredProducts();

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          </div>
        </div>
        <div className="row">
          {products.map(product => (<div className="col my-3" key={product.gtin}><ProductCard product={product}/></div>))}
        </div>
      </div>
    );
  }
}

export default App;
