import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/"><i className="fas fa-laptop-code"></i> Findd</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item text-white">
                            <Link className="nav-link" to="/create">Create University</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header
