// oh man lol

export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";

const addProductToCart = (product, state) => {
  const newProductID = product.fields.id;
  let updatedCart = [...state.cart];
  // Find index of item already present in cart
  const updatedItemIndex = updatedCart.findIndex(
    item => item.product.fields.id === newProductID
  )

  if (updatedItemIndex < 0) {
    // THIS WORKS!! DON"T GET RID OF THIS!!! LOL
    return {
      cart: state.cart.concat({product: product, quantity: 1})
    }
  } else {
      const updatedItem = {
        ...updatedCart[updatedItemIndex]
      };
      ++updatedItem.quantity;
      updatedCart[updatedItemIndex] = updatedItem;
      return {
        cart: updatedCart
      };
  }
      // REDUCERS HAVE TO RETURN SOMETHING!!! YOU HAVE SPECIFY EXACTLY WHAT IT RETURNS!!!
}

const removeProductFromCart = (productId, state) => {
  console.log("Removing product with id: " + productId);
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(item => item.product.fields.id === productId);

  const updatedItem = {
    ...updatedCart[updatedItemIndex]
  };
  --updatedItem.quantity;
  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { cart: updatedCart };
};

const increaseQuantity = (productId, state) => {
  let updatedCart = [...state.cart];
  // Find index of item already present in cart
  const updatedItemIndex = updatedCart.findIndex(
    item => item.product.fields.id === productId
  )
  // I'm repeating myself here, but that's okay + this isn't quite working yet but I gotta stop for today LOL
  const updatedItem = {
    ...updatedCart[updatedItemIndex]
  };
  ++updatedItem.quantity;
  updatedCart[updatedItemIndex] = updatedItem;
  return {
    cart: updatedCart
  };
}

const decreaseQuantity = (productId, state) => {
  let updatedCart = [...state.cart];
  // Find index of item already present in cart
  const updatedItemIndex = updatedCart.findIndex(
    item => item.product.fields.id === productId
  )
  // I'm repeating myself here, but that's okay
  const updatedItem = {
    ...updatedCart[updatedItemIndex]
  };
  --updatedItem.quantity;
  updatedCart[updatedItemIndex] = updatedItem;
  return {
    cart: updatedCart
  };
}

export const shopReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductToCart(action.product, state);
    case REMOVE_PRODUCT:
      return removeProductFromCart(action.productID, state);
    case INCREASE_QUANTITY:
      return increaseQuantity(action, state);
    case DECREASE_QUANTITY:
      return decreaseQuantity(action, state);
    default:
      return state;
  }
}