import { sanitizeGenders } from './product';

test('sanitizes empty string at gender', () => {
  const lintedProducts = sanitizeGenders([{
    title: '',
    gtin: '',
    gender: '',
    sale_price: '',
    price: '',
    image_link: '',
    additional_image_link: '',
  }]);
  expect(lintedProducts[0].gender).toBe(null);
});

test('sanitizes undefined at gender', () => {
  const lintedProducts = sanitizeGenders([{
    title: '',
    gtin: '',
    gender: undefined,
    sale_price: '',
    price: '',
    image_link: '',
    additional_image_link: '',
  }]);
  expect(lintedProducts[0].gender).toBe(null);
});

test('sanitizes invalid string at gender', () => {
  const lintedProducts = sanitizeGenders([{
    title: '',
    gtin: '',
    gender: 'a',
    sale_price: '',
    price: '',
    image_link: '',
    additional_image_link: '',
  }]);
  expect(lintedProducts[0].gender).toBe(null);
});

test('sanitizes invalid number at gender', () => {
  const lintedProducts = sanitizeGenders([{
    title: '',
    gtin: '',
    gender: 0,
    sale_price: '',
    price: '',
    image_link: '',
    additional_image_link: '',
  }]);
  expect(lintedProducts[0].gender).toBe(null);
});
