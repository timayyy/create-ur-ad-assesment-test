import React from 'react'
import UniversityCard from './UniversityCard'


import Message from "../components/Message";
import Loader from "../components/Loader";


const UniversityList = ({ loading, searchLoading, filterLoading, error, searchError, filterError, universities }) => {

    console.log(universities)
    return (
        <>
            {loading || searchLoading || filterLoading ? (
                <Loader />
            ) : error || searchError || filterError ? (
                <Message variant='danger'>{error || searchError || filterError}</Message>
            ) : universities.length === 0 ? (<Message>"No result(s) found"</Message>) : (
                universities.map((university) => (
                    <UniversityCard key={university.id} university={university} />
                ))

            )
            }
        </>
    )
}

export default UniversityList
