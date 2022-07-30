import { Helmet } from "react-helmet-async";
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import Axios from 'axios';
import { MyContext } from '../MyContext';


export default function SigninScreen() {
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/'

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { state, dispatch: contextDispatch } = useContext(MyContext)
    const { userInfo } = state;

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { userData } = await Axios.post('/api/users/signin', {
                email,
                password
            });
            contextDispatch({ type: 'USER_SIGNIN', payload: userData })
            localStorage.setItem('userInfo', JSON.stringify(userData));
            navigate(redirect || '/');
        } catch (error) {
            alert("Invalid email or password");
        }
    }
    return (
        <Container className="small-container">
            <Helmet>
                <title>SIgn in</title>
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