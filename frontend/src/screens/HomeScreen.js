import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from 'react-bootstrap'
import FilterBox from '../components/FilterBox'
import UniversityList from '../components/UniversityList'
import { listUniversities, searchUniversities, filterUniversities, previousPage, nextPage, } from "../actions/universityActions";
import SearchBox from '../components/SearchBox';
import Paginate from '../components/Paginate';

const HomeScreen = () => {
    const [keyword, setKeyword] = useState("");
    const [countryCode, setCountryCode] = useState("");


    const dispatch = useDispatch();

    const universityList = useSelector((state) => state.universityList);
    const { loading, error, start, limit, pages, previous, next, universities } = universityList;

    const universitySearch = useSelector((state) => state.universitySearch);
    const { loading: searchLoading, error: searchError } = universitySearch;

    const universityFilter = useSelector((state) => state.universityFilter);
    const { loading: filterLoading, error: filterError } = universityFilter;

    const universityDelete = useSelector((state) => state.universityDelete);
    const { loading: loadingDelete,
        error: errorDelete,
        success: successDelete, } = universityDelete;

    if (errorDelete) {
        alert("Could not delete university. Try again")
    }


    useEffect(() => {
        dispatch(listUniversities())
    }, [dispatch, successDelete]);

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword === '') {
            dispatch(listUniversities())
        } else {
            dispatch(searchUniversities(keyword.toLowerCase(), start, limit))
        }
    }
    const filterSubmitHandler = (e) => {
        e.preventDefault();
        if (countryCode === '') {
            dispatch(listUniversities())
        } else {
            dispatch(filterUniversities(countryCode))
        }

    }
    const paginatePreviousPage = () => {
        dispatch(previousPage(previous))
    }

    const paginateNextPage = () => {
        dispatch(nextPage(next))
    }



    return (
        <div className="my-5">
            <Row>
                <Col md="4">
                    <SearchBox onChange={(e) => setKeyword(e.target.value)} searchSubmitHandler={searchSubmitHandler} keyword={keyword} />
                    <FilterBox onChange={(e) => setCountryCode(e.target.value)} filterSubmitHandler={filterSubmitHandler} countryCode={countryCode} />
                    <div className="my-3">
                        <Button className="btn-block" onClick={() => {
                            dispatch(listUniversities())
                            setKeyword('')
                            setCountryCode('')
                        }}>Reset filters</Button>
                    </div>

                </Col>
                <Col md="8">
                    <UniversityList loading={loading} searchLoading={searchLoading} error={error} universities={universities} searchError={searchError} filterLoading={filterLoading} filterError={filterError} start={start} pages={pages} loadingDelete={loadingDelete} errorDelete={errorDelete} />
                    <Paginate start={start} pages={pages} previous={previous} next={next} paginatePreviousPage={paginatePreviousPage} paginateNextPage={paginateNextPage} />
                </Col>
            </Row>
        </div>
    )
}

export default HomeScreen
