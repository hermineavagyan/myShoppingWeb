import React from 'react';
import { Helmet } from 'react-helmet-async';
import CheckOutSteps from '../components/CheckoutSteps';
import { Form, Button } from 'react-bootstrap';
import { MyContext } from '../MyContext';
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentMethodScreen() {
    const navigate = useNavigate();
    const { state, dispatch: contextDispatch } = useContext(MyContext)
    const {
        cart: { shippingAddress, paymentMethod, }
    } = state
    const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || 'PayPal')
    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])
    const submitHandler = (e) => {
        e.preventDefault();
        contextDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
        localStorage.setItem('paymentMethod', paymentMethodName);
        navigate('/placeorder')
    }
    return (
        <div>
            <CheckOutSteps stepOne stepTwo stepThree></CheckOutSteps>

            <div className="container small container">
                <Helmet>
                    <title>Payment Method</title>
                </Helmet>
                <h1 className="my-3">Payment Method</h1>
                <Form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <Form.Check
                            type="radio"
                            id="PayPal"
                            label="Paypal"
                            value="Paypal"
                            checked={paymentMethodName === 'PayPal'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </div>
                    <div className="mb-3">
                        <Form.Check
                            type="radio"
                            id="Stripe"
                            label="Stripe"
                            value="Stripe"
                            checked={paymentMethodName === 'Stripe'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </div>
                    <div className="my-3">
                        <Button type="submit">Continue</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}
