// oh man lol

export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";

const addProductToCart = (product, state) => {
  const newProductID = product.fields.id;
  // can't use spread operator if there's nothing in the cart
  if (state.cart.length === 0) {
    state.cart.push({product: {...product}, quantity: 1});
    console.log(state.cart);
    return state;
  } else {
    // match the ID
    let updatedCart = [...state.cart];
    const updatedItemIndex = updatedCart.findIndex(
      item => item.product.fields.id === newProductID
    )

      //returning updatedCart is NOT WORKING

    if (updatedItemIndex < 0) {
      // push product if ID is not found
      updatedCart.push({product: {...product}, quantity: 1});
      console.log(updatedCart);
      return updatedCart;
    } else {
      // update quantity
      const updatedItem = {
        ...updatedCart[updatedItemIndex]
      };
      ++updatedItem.quantity;
      updatedCart[updatedItemIndex] = updatedItem;
      console.log(updatedCart)
      return updatedCart;
    }
      // REDUCERS HAVE TO RETURN SOMETHING!!! YOU HAVE SPECIFY EXACTLY WHAT IT RETURNS!!!
  }
}

export const shopReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductToCart(action.product, state);
    default:
      throw new Error();
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
