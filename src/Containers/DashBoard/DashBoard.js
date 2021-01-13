import React, { Component } from 'react';
import bus from '../../images/bus.png';

class DashBoard extends Component{
    render(){
        return(
            <div>
                <div className="wrapper">
        <nav id="sidebar">
            <div className="sidebar-header">
                <div className="row">
                    <div className="col-md-10">
                    <h3>Bus Tracker</h3>
                <small>largest tracking system</small>
                    </div>
                    <div className="col-md-2">
                    <button type="button" id="sidebarCollapse" className="btn btn-info">
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>
                    </button>
                    </div>
                </div>
                
            </div>

            <ul className="list-unstyled components">
                <li>
                    <a href="/">DashBoard</a>
                </li>
                <li>
                    <a href="/bus">Bus</a>
                </li>
                <li>
                    <a href="/route">Route</a>
                </li>
                <li>
                    <a href="/schedule">Schedule</a>
                </li>
            </ul>
        </nav>

        <div id="content">

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-align-justify"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">DashBoard</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/bus">Bus</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/route">Route</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/schedule">Schedule</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Dashboard widgets */}
            <div className="row">
                <div className="col-md-12">
                    <div className="card col-md-3">
                        <img className="card-img-top" src={bus} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Registed Bus Count : 6</h5>
                            <p className="card-text">Large number of buses are registed in our system.</p>
                            <a href="/bus" className="btn btn-primary">Go For Bus</a>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    </div>

            </div>
        );
    }
}

export default DashBoard;