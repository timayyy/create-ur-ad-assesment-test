import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { Form, Col } from "react-bootstrap";
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { createUniversity } from "../actions/universityActions";
import { UNIVERSITY_CREATE_RESET } from '../constants/universityConstants';

const CreateScreen = ({ history }) => {
    const [name, setName] = useState("");
    const [domain, setDomain] = useState("");
    const [webpage, setWebpage] = useState("");
    const [alphaTwoCode, setAlphaTwoCode] = useState("");
    const [country, setCountry] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const universityCreate = useSelector((state) => state.universityCreate);
    const { loading, error, success } = universityCreate;

    useEffect(() => {
        if (success) {
            dispatch({ type: UNIVERSITY_CREATE_RESET });
            history.push('/')
        }
    }, [dispatch, history, success]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (name === '' || domain === '' || webpage === '' || alphaTwoCode === '' || country === '' || imgUrl === '' || description === '') {
            setMessage("Fill in all fields")
        }
        else if (alphaTwoCode.length > 2 || alphaTwoCode.length < 2) {
            setMessage("Country code should be 2 characters")
        } else {
            dispatch(createUniversity(name, domain, webpage, alphaTwoCode.toUpperCase(), country, imgUrl, description))
        }
    }

    return (
        <FormContainer>
            <h1>Create A University</h1>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            {loading && <Loader />}
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter University Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId='domain'>
                        <Form.Label>Domain</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter university domain'
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId='webpage'>
                        <Form.Label>Web Page</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter university webpage'
                            value={webpage}
                            onChange={(e) => setWebpage(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId='alphaTwoCode'>
                        <Form.Label>Country Code</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter university country code'
                            value={alphaTwoCode}
                            onChange={(e) => setAlphaTwoCode(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId='country'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter university country'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId='imgUrl'>
                    <Form.Label>Image Url</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Image URL'
                        value={imgUrl}
                        onChange={(e) => setImgUrl(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter description '
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <button type='submit' className='btn btn-primary'>
                    Create
                </button>
            </Form>
        </FormContainer>
    )
}

export default CreateScreen
