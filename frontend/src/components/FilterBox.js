import React from 'react'
import { useSelector } from "react-redux";
import { Form, Button } from 'react-bootstrap'

const FilterBox = ({ onChange, countryCode, filterSubmitHandler }) => {


    const universityList = useSelector((state) => state.universityList);
    const { loading, universities } = universityList;

    const country_codes = []
    if (!loading) {
        universities.forEach(uni => {
            country_codes.push(uni.alpha_two_code)
        })
    }

    return (
        <div>
            <h4>Filter</h4>
            <Form onSubmit={filterSubmitHandler}>
                <Form.Group controlId='artist'>
                    <Form.Label>Artist</Form.Label>
                    <Form.Control
                        as='select'
                        value={countryCode}
                        onChange={onChange}
                    >
                        <option label="Any" value=""></option>
                        {country_codes.map((code) => (
                            <option
                                key={`${code}`}
                                label={`${code}`}
                                value={`${code}`}
                            ></option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='btn-block'>
                    Find Universities by Country Code
                    </Button>
            </Form>
        </div>
    )
}

export default FilterBox
