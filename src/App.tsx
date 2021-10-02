import React, { Component } from 'react';

import ProductCard from './components/ProductCard';
import SearchBox from './components/SearchBox';
import { getProducts } from './services/product';
import './App.css';
import { State } from './types/state';

class App extends Component {
  state: State = {
    products: [],
  };

  async componentDidMount() {
    const products = await getProducts();
    products.splice(100, products.length - 100);
    this.setState({ products });
  }

  render() {
    const { products } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <SearchBox />
          </div>
        </div>
        <div className="row">
          {products.map(product => (<div className="col my-3"><ProductCard product={product}/></div>))}
        </div>
      </div>
    );
  }
}

export default App;
