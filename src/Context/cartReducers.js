// oh man lol

export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";

const addProductToCart = (product, state) => {
  // can't use spread operator if there's nothing in the cart
  if (state.cart.length === 0) {
    state.cart.push({product: {...product}, "quantity": 1});
  } else {
    // gotta figure out how to compare product IDs here, hmmm...
    const newProductID = product.fields.id;
    state.cart.forEach(element => {
      if (element.product.fields.id === newProductID) {
        console.log("current product: " + element.product.fields.name + " and quantity is " + element.quantity)
        return ++element.quantity
      } else {
        state.cart.push({product: {...product}, "quantity": 1});
        console.log("New product added: " + product.fields.name)
      }
    });
  }
  return {cart: [...state.cart]}
  // REDUCERS HAVE TO RETURN SOMETHING!!! YOU HAVE SPECIFY EXACTLY WHAT IT RETURNS!!!

  // This *might* be working? Still not sure if I'm returning the correct thing.
}

export const shopReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductToCart(action.product, state);
  }
}

// const addProductToCart = (product, state) => {
//   // const updatedCart = [...state];
//   // const updatedItemIndex = updatedCart.findIndex(
//   //   item => item.fields.id === product.fields.id
//   // );

//   // if (updatedItemIndex < 0) {
//   //   updatedCart.push({ ...product, quantity: 1 });
//   // } else {
//   //   const updatedItem = {
//   //     ...updatedCart[updatedItemIndex]
//   //   };
//   //   updatedItem.quantity++;
//   //   updatedCart[updatedItemIndex] = updatedItem;
//   // }
//   // return { ...state, cart: updatedCart };
// };

// const removeProductFromCart = (productId, state) => {
//   console.log("Removing product with id: " + productId);
//   const updatedCart = [...state.cart];
//   const updatedItemIndex = updatedCart.findIndex(item => item.id === productId);

//   const updatedItem = {
//     ...updatedCart[updatedItemIndex]
//   };
//   updatedItem.quantity--;
//   if (updatedItem.quantity <= 0) {
//     updatedCart.splice(updatedItemIndex, 1);
//   } else {
//     updatedCart[updatedItemIndex] = updatedItem;
//   }
//   return { ...state, cart: updatedCart };
// };

// export const shopReducer = (state, action) => {
//   switch (action.type) {
//     case ADD_PRODUCT:
//       return addProductToCart(action.product, state);
//     case REMOVE_PRODUCT:
//       return removeProductFromCart(action.productId, state);
//     default:
//       return state;
//   }
// };
