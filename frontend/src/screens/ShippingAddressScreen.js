import React, { useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';
import { Helmet } from "react-helmet-async";
import { useState, useContext } from "react";
import { MyContext } from '../MyContext';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen() {
    const navigate = useNavigate();
    const { state, dispatch: contextDispatch } = useContext(MyContext);

    const {
        userInfo,
        cart: { shippingAddress },
    } = state;
    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');

    useEffect(
        () => {
            if (!userInfo) {
                navigate('/signin?redirect = /shipping')
            }
        }, [userInfo, navigate]

    )
    const [country, setCountry] = useState(shippingAddress.country || '');


    const submitHandler = (e) => {
        e.preventDefault();
        contextDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country,
            }
        });
        localStorage.setItem('shippingAddress', JSON.stringify({
            fullName,
            address,
            city,
            postalCode,
            country,
        })
        );
        navigate('/payment')
    }
    return (
        <div>
            <Helmet>
                <title> Shipping Address </title>
            </Helmet>
            <CheckoutSteps stepOne stepTwo></CheckoutSteps>
            <div className="container small-container">
                <h1 className="my-3">Shipping Address</h1>
                <Form onSubmit={submitHandler}>

                    <Form.Group className="mb-3" controlId="fullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="postalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            required
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        ></Form.Control>
                    </Form.Group>
                    <div className="mb-3">
                        <Button variant="primary" type="submit">
                            Continue
                        </Button>
                    </div>
                </Form>

            </div>

        </div>
    )
}
