import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function CheckoutSteps(props) {
    return (
        <Row className="checkout-steps">
            <Col className={props.stepOne ? 'acitve' : ''} >Sign In</Col>
            <Col className={props.stepTwo ? 'acitve' : ''} >Shipping</Col>
            <Col className={props.stepThree ? 'acitve' : ''} >Payment</Col>
            <Col className={props.stepFour ? 'acitve' : ''} >Place Order</Col>
        </Row>
    )
}
