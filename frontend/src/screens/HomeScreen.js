import { Link } from "react-router-dom";

import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        //if the action.type is not equal to these 3 values    
        default:
            //then return current state
            return state
    }
}

function HomeScreen() {
    const [{ loading, error, products }, dispatch] = useReducer(reducer, {
        loading: true,
        error: ''
    });
    //const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/products');
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL' })
            }

            setProducts(result.data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1> List Products</h1>

            <div className="products">
                {products.map((product) => (
                    <div className="product" key={product.slug}>
                        <Link to={`/product/${product.slug}`}>
                            <img src={product.image} alt={product.name} />
                        </Link>
                        <div className="product_info">
                            <Link to={`/product/${product.slug}`}>
                                <p>{product.name}</p>
                            </Link>

                            <p><strong>${product.price}</strong></p></div>
                        <button>Add to cart</button>
                    </div>
                ))}
            </div>
        </div>
    )


}
export default HomeScreen;