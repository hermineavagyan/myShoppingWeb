import React, { useContext, useEffect } from 'react';
import { useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { MyContext } from '../MyContext';

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}

export default function OrderScreen() {


    const navigate = useNavigate();
    const { userinfo } = state;

    const params = useParams();
    const { id: orderId } = params;

    const { state } = useContext(MyContext)
    const [{ loading, error, order }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
    })
    useEffect(() => {
        if (!userInfo) {
            return navigate('/signin')
        }
    }, [])
    return (
        loading ?
            (<LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div></div>
            )
    )
}
