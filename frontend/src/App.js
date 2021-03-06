
import './App.css';
import { BrowserRouter, Route, Routes, } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import { Container, Navbar, Nav, Badge, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from './MyContext';
import SigninScreen from './screens/SigninScreen';
//import data from '../../backend/data';

function App() {
  const { state, dispatch: contextDispatch } = useContext(MyContext)
  const { cart, userInfo } = state;


  const signouthandler = () => {
    contextDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
  }
  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>myShoppingWeb
                </Navbar.Brand>
              </LinkContainer>
              <Nav classname="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {
                    cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {
                          //cart.cartItems.length
                          cart.cartItems.reduce((a, c) => a + c.quantity, 0)
                        }
                      </Badge>
                    )
                  }
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item" to="#signout"
                      onClick={signouthandler}>
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">Sign in </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />}></Route>
              <Route path="/cart" element={<CartScreen />}></Route>
              <Route path="/signin" element={<SigninScreen />}></Route>
              <Route path="/" element={<HomeScreen />}></Route>
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
