import React from 'react';
import CheckOutSteps from '../components/CheckoutSteps';
import { Helmet } from "react-helmet-async";
import { Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from "react";
import { MyContext } from '../MyContext';
import { useNavigate } from "react-router-dom";

export default function PlaceOrderScreen() {

    const { state, dispatch: contextDispatch } = useContext(MyContext)
    const { cart, userInfo } = state

    return (
        <div>
            <CheckOutSteps stepOne stepTwo stepThree></CheckOutSteps>
            <Helmet>
                <title>Preview Order</title>
            </Helmet>
            <h1 className="my-3">Preview Order</h1>
            <Row>
                <Col md={8}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Shipping</Card.Title>
                            <Card.Text>
                                <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                                <strong>Address: </strong> {cart.shippingAddress.address},
                                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                                {cart.shippingAddress.country}
                            </Card.Text>
                            <Link to="/shipping">Edit</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}></Col>
            </Row>
        </div>
    )
}
