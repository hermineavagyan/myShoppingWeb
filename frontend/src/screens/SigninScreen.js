import { Helmet } from "react-helmet-async";
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Axios from 'axios';
import { MyContext } from '../MyContext';
import axios from "axios";


export default function SigninScreen() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/'

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { state, dispatch: contextDispatch } = useContext(MyContext)
    const { userInfo } = state;

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { userData } = await axios.post('/api/users/signin', {
                email,
                password
            });
            contextDispatch({ type: 'USER_SIGNIN', payload: userData })
            console.log(userData);
            localStorage.setItem('userInfo', JSON.stringify(userData));
            console.log(userInfo)
            navigate(redirect || '/');
        } catch (error) {
            alert("Invalid email or password");
        }
    }
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    return (
        <Container className="small-container">
            <Helmet>
                <title>Sign in</title>
            </Helmet>
            <h1 className="my-3"> SIgn in</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit">Sign In</Button>
                </div>
                <div className="mb-3">
                    New customer? {" "}
                    <Link to={`/signup?redirect = ${redirect}`}>Create account</Link>
                </div>

            </Form>
        </Container>
    )
}