import axios from "axios";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useReducer, } from 'react';
import { Row, Col, ListGroup, Card, Badge, Button } from 'react-bootstrap';
import Rating from "../components/Rating";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MesssageBox";
import { getError } from "../helpers";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, product: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        //if the action.type is not equal to these 3 values    
        default:
            //then return current state
            return state
    }
}

function ProductScreen() {
    const params = useParams();
    const { slug } = params;

    const [{ loading, error, product }, dispatch] = useReducer(reducer, {
        product: [],
        loading: true,
        error: ''
    });
    //const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            //use dispatch to update the state to set loading to true 
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/products/slug/${slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
            }

            //setProducts(result.data);
        };
        fetchData();
    }, [slug]);

    return (
        loading ? (
            <LoadingBox></LoadingBox>
        ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
            <div>
                <Row>
                    <Col md={6}>
                        <img className="img-large"
                            src={product.image}
                            alt={product.name}
                        />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Helmet>
                                    <title>{product.name}</title>
                                </Helmet>
                                <h1>{product.name}</h1>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating
                                    rating={product.rating}
                                    numReviews={product.numReviews}>
                                </Rating>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: {product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>${product.price}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>{product.countInStock > 0 ? (
                                                <Badge bg="success">In stock</Badge>
                                            ) : (
                                                <Badge bg="danger">Out of stack</Badge>)
                                            }</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <div className="d-grid">
                                                <Button variant="primary">Add to cart</Button>
                                            </div>
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    )
}
export default ProductScreen;