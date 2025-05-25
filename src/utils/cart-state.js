export function validItem(item) {
  return item && item.id != null && Number.isFinite(Number(item.price)) && Number(item.price) >= 0 &&
    Number.isSafeInteger(item.quantity) && item.quantity > 0 &&
    (item.stock == null || (Number.isSafeInteger(Number(item.stock)) && item.quantity <= Number(item.stock)));
}
export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const item = {...action.payload, quantity: action.payload?.quantity ?? 1};
      if (!validItem(item)) return state;
      const existing = state.cartItems.find(current => current.id === item.id);
      if (!existing) return {...state, cartItems: [...state.cartItems, item]};
      const updated = {...existing, quantity: existing.quantity + item.quantity};
      if (!validItem(updated)) return state;
      return {...state, cartItems: state.cartItems.map(current => current.id === item.id ? updated : current)};
    }
    case 'UPDATE_QUANTITY': {
      const existing = state.cartItems.find(item => item.id === action.payload.id);
      const updated = {...existing, quantity: action.payload.quantity};
      if (!existing || !validItem(updated)) return state;
      return {...state, cartItems: state.cartItems.map(item => item.id === updated.id ? updated : item)};
    }
    case 'REMOVE_FROM_CART': return {...state, cartItems: state.cartItems.filter(item => item.id !== action.payload.id)};
    case 'CLEAR_CART': return {...state, cartItems: []};
    case 'LOAD_CART': return {...state, cartItems: Array.isArray(action.payload) ? action.payload.filter(validItem) : []};
    default: return state;
  }
}
export function cartTotal(items) {
  return items.reduce((cents, item) => cents + Math.round(Number(item.price) * 100) * item.quantity, 0) / 100;
}
export function loadCart(storage) {
  try { return cartReducer({cartItems: []}, {type: 'LOAD_CART', payload: JSON.parse(storage.getItem('cartItems'))}); }
  catch { return {cartItems: []}; }
}
