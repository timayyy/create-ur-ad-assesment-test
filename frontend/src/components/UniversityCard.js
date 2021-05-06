import React from 'react'
import { useDispatch } from "react-redux";
import { deleteUniversity } from '../actions/universityActions';
import { Link } from 'react-router-dom'

const UniversityCard = ({ university, }) => {

    const dispatch = useDispatch();

    const deleteUniversityHandler = (id) => {
        if (window.confirm("Are you sure")) {
            //DELETE university
            dispatch(deleteUniversity(id));
        }
    };
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
                <Link to={`/update/${university.id}`} className="btn btn-block btn-primary">Edit</Link>
                <button className="btn btn-block btn-danger" onClick={() => { deleteUniversityHandler(university.id) }}>Delete</button>
            </div >
        </div >
    )
}

export default UniversityCard
