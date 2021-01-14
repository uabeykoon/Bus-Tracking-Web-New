import React, { Component } from 'react';
import './Routelist.css';
import axios from '../../../Axios/Axios';

class RouteList extends Component {
    state = {
        routeList: [],
        stationList: [],
        routerListWithAllAttrib: []
    };

    findRelatedStation = (id) => {
        return this.state.stationList.find((el) => el.id === id);
    }

    convertObjectToArray = (incomingObject) => {
        let newArray = [];
        for (let key in incomingObject) {
            newArray.push({ ...incomingObject[key], id: key });
        }
        return newArray;
    }

    combineRelatedObject = () => {
        let newArray = []
        for (let ob of this.state.routeList) {
            newArray.push({ ...ob, destination1: this.findRelatedStation(ob.destination1), destination2: this.findRelatedStation(ob.destination2) })
        }
        return newArray;
    }

    componentDidMount() {
        axios.get("route.json")
            .then((response) => {
                axios.get("stations.json")
                    .then((response2) => {
                //fetch ad converto to array stations
                        this.setState({
                            stationList: this.convertObjectToArray(response2.data)
                        });
                 //fetch ad converto to array route
                        this.setState({
                            routeList: this.convertObjectToArray(response.data)
                        });

                        this.setState({
                            routerListWithAllAttrib:this.combineRelatedObject()
                        });
                    })
                    .catch((e) => {
                        console.log(e);
                    });

            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
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
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
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
            <div>
                <br />
                <table id="customers">
                    <thead>
                        <tr>
                            <th>Bus Number</th>
                            <th>Destination 1</th>
                            <th>Destination 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.routerListWithAllAttrib.map((routerObject) => {
                            return (<tr key={routerObject.id}>
                                <td>{routerObject.routeNumber}</td>
                                <td>{routerObject.destination1.stationName}({routerObject.destination1.district})</td>
                                <td>{routerObject.destination2.stationName}({routerObject.destination2.district})</td>
                            </tr>);
                        })}

                    </tbody>
                </table>
            </div>
            </div>
            </div>
            </div>
        );
    }
}

export default RouteList;