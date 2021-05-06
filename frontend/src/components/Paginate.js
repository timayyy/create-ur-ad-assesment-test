import React, { useState } from 'react'
import { Pagination } from 'react-bootstrap'

const Paginate = ({ pages, start, previous, next, paginatePreviousPage, paginateNextPage, keyword = '' }) => {
    const [currentpage, setCurrentpage] = useState(start)


    return pages > 1 && (
        <Pagination>
            {previous ? (<Pagination.Prev onClick={() => {
                paginatePreviousPage()
                setCurrentpage(currentpage - 1)
            }} />) : (<Pagination.Prev disabled />)}
            {/* {[...Array(pages).keys()].map(x => (

                <Pagination.Item key={x} active={x + 1 === currentpage}>{x + 1}</Pagination.Item>
            ))} */}
            {next ? <Pagination.Next
                onClick={() => {
                    paginateNextPage()
                    setCurrentpage(currentpage + 1)
                }}
            /> : <Pagination.Next disabled />}
        </Pagination>
    )
}

export default Paginate
