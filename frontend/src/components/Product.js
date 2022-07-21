import { Link } from "react-router-dom";
import { useContext } from "react";
import { Button, Card, } from "react-bootstrap";
import Rating from "./Rating";
import { MyContext } from "../MyContext";
import axios from 'axios'

function Product(props) {
    const { product } = props;

    const { state, dispatch: contextDispatch } = useContext(MyContext);
    const { cart: { cartItems }, } = state;

    const addToCartHandler = async (item) => {
        const itemAvailable = cartItems.find((item) => item._id === product._id);
        const quantity = itemAvailable ? itemAvailable.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry the item is out of stock ');
            return;
        }
        contextDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
        });
    };
    return (
        <Card>
            <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} className="card-img-top" />
            </Link>
            <Card.Body>
                <Link to={`/product/${product.slug}`}>
                    <Card.Title>{product.name}</Card.Title>
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                <Card.Text>${product.price}</Card.Text>
                {product.countInStock === 0 ? <Button variant='light' disabled>Out of Stock</Button>
                    : <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>}


            </Card.Body>
        </Card>
    )
}
export default Product;