import React, { useContext } from 'react';
import ShopContext from './ShopContext';

const Global = (props) => {
    const addToCart = (product) => {
        console.log(product.fields.name + " added to cart")
    }
    
    const deleteFromCart = () => {
        console.log("delete from cart")
    }
    
    return (
        <ShopContext.Provider value={{
            something: "something",
            cart: [],
            addToCart: addToCart,
            deleteFromCart: deleteFromCart
        }}>
            {props.children}
        </ShopContext.Provider>
    
    )
};

export default Global;