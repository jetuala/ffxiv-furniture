import React, { useReducer } from 'react';
import { shopReducer } from './cartReducers';
import ShopContext from './ShopContext';

const Global = (props) => {
    const initialCart = {cart: []};
    const [ cartState, dispatch ] = useReducer(shopReducer, initialCart);
    // useReducers are kinda backwards in my mind, you set initial state on the right, "variables" on the left

    const addToCart = (product) => {
        dispatch({type: "ADD_PRODUCT", product: product});
    }
    
    const deleteFromCart = (product) => {
        dispatch({type: "REMOVE_PRODUCT", product: product.fields.id})
        console.log("delete from cart")
    }
    
    return (
        <ShopContext.Provider value={{
            cart: cartState.cart,
            addToCart: addToCart,
            deleteFromCart: deleteFromCart
        }}>
            {props.children}
        </ShopContext.Provider>
    
    )
};

export default Global;