import React from 'react'

const UniversityCard = ({ university }) => {
    return (
        <div className="card mb-3">
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src={university.img_url} className="card-img align-self-center" alt={university.name} />
                </div>
                <div className="col-md-8  align-self-center">
                    <div className="card-body">
                        <h5 className="card-title">
                            <a target="_blank" rel="noreferrer" href={university.web_page}>{university.name}
                                <span className="float-right badge badge-success text-uppercase">{university.alpha_two_code}</span></a>
                        </h5>
                        <span className="badge badge-primary mb-2 text-uppercase">{university.country}</span>
                        <p className="card-text">
                            {university.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UniversityCard
