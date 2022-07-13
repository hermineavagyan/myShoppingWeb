import { createContext, useReducer } from "react";

export const MyContext = createContext();

const initialState = {
    cart: {
        cartItems: [],
    }
}

function reducer(state, action) {
    switch (action.type) {
        case 'CART_ADD_ITEM':
            //add to cart 
            return {
                ...state,
                cart: {
                    ...state.cart, cartItems: [...state.cart.cartItems, action.payload],
                }
            }
        default:
            return state;
    }
}

export function MyContextProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <MyContext.Provider value={value}>{props.children}</MyContext.Provider>


}