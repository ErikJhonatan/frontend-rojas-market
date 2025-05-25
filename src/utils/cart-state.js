function numericValue(value) {
  if (typeof value !== 'number' && typeof value !== 'string') return NaN;
  if (typeof value === 'string' && !value.trim()) return NaN;
  return Number(value);
}

function priceInCents(item) {
  const price = numericValue(item.price);
  const cents = Math.round(price * 100);
  return price >= 0 && Number.isSafeInteger(cents) ? cents : NaN;
}

export function validItem(item) {
  const validId = typeof item?.id === 'string' ? Boolean(item.id.trim())
    : Number.isSafeInteger(item?.id) && item.id > 0;
  return validId && Number.isSafeInteger(item.quantity) && item.quantity > 0 &&
    Number.isSafeInteger(priceInCents(item) * item.quantity) &&
    (item.stock === undefined || (Number.isSafeInteger(numericValue(item.stock)) &&
      item.quantity <= numericValue(item.stock)));
}

export function cartTotal(items) {
  const cents = items.reduce((total, item) => {
    if (!validItem(item)) throw new Error('Invalid cart item');
    const next = total + priceInCents(item) * item.quantity;
    if (!Number.isSafeInteger(next)) throw new Error('Cart total out of range');
    return next;
  }, 0);
  return cents / 100;
}

function withItems(state, cartItems) {
  try {
    cartTotal(cartItems);
    return {...state, cartItems};
  } catch { return state; }
}

export function cartReducer(state, action) {
  if (!action) return state;
  switch (action.type) {
    case 'ADD_TO_CART': {
      const item = {...action.payload, quantity: action.payload?.quantity ?? 1};
      if (!validItem(item)) return state;
      const existing = state.cartItems.find(current => current.id === item.id);
      if (!existing) return withItems(state, [...state.cartItems, item]);
      const updated = {...existing, quantity: existing.quantity + item.quantity};
      if (!validItem(updated)) return state;
      return withItems(state, state.cartItems.map(current => current.id === item.id ? updated : current));
    }
    case 'UPDATE_QUANTITY': {
      if (!action.payload) return state;
      const existing = state.cartItems.find(item => item.id === action.payload.id);
      const updated = {...existing, quantity: action.payload.quantity};
      if (!existing || !validItem(updated)) return state;
      return withItems(state, state.cartItems.map(item => item.id === updated.id ? updated : item));
    }
    case 'REMOVE_FROM_CART': return {...state, cartItems: state.cartItems.filter(item => item.id !== action.payload?.id)};
    case 'CLEAR_CART': return {...state, cartItems: []};
    case 'LOAD_CART': {
      const seen = new Set();
      const cartItems = [];
      for (const item of Array.isArray(action.payload) ? action.payload : []) {
        if (!validItem(item) || seen.has(item.id)) continue;
        seen.add(item.id);
        cartItems.push(item);
      }
      return withItems(state, cartItems);
    }
    default: return state;
  }
}

export function loadCart(storage) {
  try { return cartReducer({cartItems: []}, {type: 'LOAD_CART', payload: JSON.parse(storage.getItem('cartItems'))}); }
  catch { return {cartItems: []}; }
}
