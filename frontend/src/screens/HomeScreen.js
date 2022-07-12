import { Link } from "react-router-dom";
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import { Row, Col } from 'react-bootstrap';
import Product from "../components/Product";

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
    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true,
        error: ''
    });
    //const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            //use dispatch to update the state to set loading to true 
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/products');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.message })
            }

            //setProducts(result.data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1> List Products</h1>

            <div className="products">
                {loading ? (<div>...Loading</div>)
                    : error ? (<div>{error}</div>)
                        : (
                            <Row>
                                {products.map((product) => (
                                    <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                                        <Product product={product}></Product>
                                    </Col>
                                ))
                                }
                            </Row>
                        )}
            </div>
        </div>
    )


}
export default HomeScreen;