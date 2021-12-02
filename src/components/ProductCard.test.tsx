import React from 'react';
import { render, screen } from '@testing-library/react';
import { Product } from '../types/product';
import ProductCard from './ProductCard';
import MockAsyncImage from './AsyncImage';

jest.mock('./AsyncImage', () => {
  return function DummyAsyncImage({src, className, width, height}: {src: string, className: string, width: number, height: number}) {
    return (<canvas className={className} width={width} height={height}></canvas>);
  };
});

const product: Product = {
  title: 'Test title',
  gtin: '0123',
  gender: 'unisex',
  sale_price: '1.00 EUR',
  price: '2.00 EUR',
  image_link: 'https://mosaic01.ztat.net/vgs/media/large/WE/B2/1N/00/HQ/11/WEB21N00H-Q11@12.4.jpg',
  additional_image_link: ''
};

test('renders title', () => {
  render(<ProductCard product={product} cachedImages={{}} />);
  const title = screen.getByText(/Test title/i);
  expect(title).toBeInTheDocument();
});
test('renders gtin', () => {
  render(<ProductCard product={product} cachedImages={{}} />);
  const gtin = screen.getByText(/0123/i);
  expect(gtin).toBeInTheDocument();
});
test('renders gender', () => {
  render(<ProductCard product={product} cachedImages={{}} />);
  const gender = screen.getByText(/unisex/i);
  expect(gender).toBeInTheDocument();
});
test('renders sale_price', () => {
  render(<ProductCard product={product} cachedImages={{}} />);
  const sale_price = screen.getByText(/1.00 EUR/i);
  expect(sale_price).toBeInTheDocument();
});
test('renders price', () => {
  render(<ProductCard product={product} cachedImages={{}} />);
  const price = screen.getByText(/2.00 EUR/i);
  expect(price).toBeInTheDocument();
});
