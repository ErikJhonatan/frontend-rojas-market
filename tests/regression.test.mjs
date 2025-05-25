import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function load(relativePath) {
  const source = await readFile(new URL(relativePath, import.meta.url), 'utf8');
  return import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
}
const {cartReducer, cartTotal, loadCart} = await load('../src/utils/cart-state.js');
test('rejects fractional quantities and stock overflow', () => {
  const state = {cartItems: [{id: 1, price: 2, quantity: 2, stock: 2}]};
  for (const quantity of [3, 1.5, -1, NaN]) {
    assert.equal(cartReducer(state, {type: 'UPDATE_QUANTITY', payload: {id: 1, quantity}}), state);
  }
});
test('calculates decimal prices in cents', () => {
  assert.equal(cartTotal([{id: 1, price: 0.1, quantity: 3}, {id: 2, price: 0.2, quantity: 1}]), 0.5);
});
test('does not crash on malformed cart storage', () => {
  assert.deepEqual(loadCart({getItem: () => '{broken'}), {cartItems: []});
  assert.deepEqual(loadCart({getItem: () => '{}'}), {cartItems: []});
});

test('rejects empty prices and invalid identifiers', () => {
  const state = {cartItems: []};
  for (const price of [null, '', '  ', true, Infinity]) {
    assert.equal(cartReducer(state, {type: 'ADD_TO_CART', payload: {id: 1, price}}), state);
  }
  assert.equal(cartReducer(state, {type: 'ADD_TO_CART', payload: {id: '', price: 2}}), state);
});
test('keeps one stored entry per product and rejects unsafe totals', () => {
  const item = {id: 1, price: 2, quantity: 1};
  assert.deepEqual(loadCart({getItem: () => JSON.stringify([item, item])}), {cartItems: [item]});
  assert.throws(() => cartTotal([{id: 1, price: Number.MAX_SAFE_INTEGER, quantity: 2}]));
});
