import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { Form, Col } from "react-bootstrap";
import FormContainer from '../components/FormContainer'
import { getUniversityDetails, updateUniversity } from '../actions/universityActions';
import Loader from "../components/Loader";
import Message from "../components/Message";
import { UNIVERSITY_UPDATE_RESET } from "../constants/universityConstants";

const UpdateScreen = ({ match, history }) => {
    const universityId = match.params.id;

    const [name, setName] = useState("");
    const [domain, setDomain] = useState("");
    const [webpage, setWebpage] = useState("");
    const [alphaTwoCode, setAlphaTwoCode] = useState("");
    const [country, setCountry] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const universityDetails = useSelector((state) => state.universityDetails);
    const { loading, error, university } = universityDetails;

    const universityUpdate = useSelector((state) => state.universityUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = universityUpdate;



    useEffect(() => {
        window.scrollTo(0, 0);
        if (successUpdate) {
            dispatch({ type: UNIVERSITY_UPDATE_RESET });
            history.push("/");
        }
        if (!university.name || university.id !== universityId) {
            dispatch(getUniversityDetails(universityId))
            setName(university.name)
            setDomain(university.domain)
            setWebpage(university.web_page)
            setAlphaTwoCode(university.alpha_two_code)
            setCountry(university.country)
            setImgUrl(university.img_url)
            setDescription(university.description)
        }
    }, [dispatch, history, successUpdate, universityId, university.id, university.web_page, university.name, university.domain, university.alpha_two_code, university.country, university.img_url, university.description]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (name === '' || domain === '' || webpage === '' || alphaTwoCode === '' || country === '' || imgUrl === '' || description === '') {
            setMessage("Fill in all fields")
        }
        else if (alphaTwoCode.length > 2 || alphaTwoCode.length < 2) {
            setMessage("Country code should be 2 characters")
        } else {
            dispatch(updateUniversity(university.id, name, domain, webpage, alphaTwoCode.toUpperCase(), country, imgUrl, description))
        }
    }

    return (
        <>
            { loading ? <Loader /> : (
                <FormContainer>
                    <h1>Update a University</h1>
                    <Link className='btn btn-light my-3' to='/'>
                        Go Back
                    </Link>

                    {loadingUpdate && <Loader />}
                    {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
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
                            Update
                </button>
                    </Form>
                </FormContainer>
            )
            }
        </>
    )
}

export default UpdateScreen
