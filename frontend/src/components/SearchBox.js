import React from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ searchSubmitHandler, onChange, keyword }) => {
    return (
        <div class="card card-body mb-4">
            <h4 class="mb-3">Search</h4>
            <Form onSubmit={searchSubmitHandler}>
                <Form.Control
                    type='text'
                    name='q'
                    onChange={onChange}
                    placeholder='Search by university name...'
                    value={keyword}
                />
                <br />
                <Button type='submit' variant='primary' className='btn-block'>
                    Search
                    </Button>
            </Form>
        </div>
    )
}

export default SearchBox
