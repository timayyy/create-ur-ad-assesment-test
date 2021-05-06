import React from 'react'
import UniversityCard from './UniversityCard'


import Message from "./Message";
import Loader from "./Loader";



const UniversityList = ({ loading, searchLoading, filterLoading, error, searchError, filterError, universities }) => {
    return (
        <>
            {loading || searchLoading || filterLoading ? (
                <Loader />
            ) : error || searchError || filterError ? (
                <Message variant='danger'>{error || searchError || filterError}</Message>
            ) : universities.length === 0 ? (<Message>"No result(s) found"</Message>) : (
                universities.map((university, index) => (
                    <>
                        <UniversityCard key={index} university={university} />

                    </>
                ))

            )
            }
        </>
    )
}

export default UniversityList
