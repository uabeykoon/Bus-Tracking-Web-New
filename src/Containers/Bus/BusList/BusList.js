import React, { Component } from 'react';
import './BusList.css'
import axios from '../../../Axios/Axios';

class BusList extends Component {
    state = {
        busList: [],
        routeList: [],
        stationList: [],
        routerListWithAllAttrib: [],
        busListWithAllAttribb: [],
        errMessage: false,
        validate: true
    }

    componentDidMount() {
        this.fetchingAllDataToDisplay();
    }

    getAllBus = () => {
        axios.get("bus.json")
            .then((bus) => {
                console.log(bus.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }





    fetchingAllDataToDisplay = () => {
        axios.get("route.json")
            .then((response) => {
                axios.get("stations.json")
                    .then((response2) => {
                        axios.get("bus.json")
                            .then((respons3) => {
                                //fetch ad converto to array stations
                                this.setState({
                                    stationList: this.convertObjectToArray(response2.data)
                                });
                                //fetch ad converto to array route
                                this.setState({
                                    routeList: this.convertObjectToArray(response.data)
                                });

                                this.setState({
                                    routerListWithAllAttrib: this.combineRelatedObject()
                                });

                                this.setState({
                                    busList: this.convertObjectToArray(respons3.data)
                                });

                                this.setState({
                                    busListWithAllAttribb: this.combineFullRouteToBus()
                                })
                                //console.log(this.state.routerListWithAllAttrib)
                                // console.log(this.state.stationList);
                                //console.log(this.state.routerListWithAllAttrib)

                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }






    findRelatedObject = (id, array) => {
        return array.find((el) => el.id === id);
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
        //console.log(newArray);
        return newArray;
    }
    combineFullRouteToBus = () => {
        let newArray = []
        for (let ob of this.state.busList) {
            newArray.push({ ...ob, routeID: this.findRelatedObject(ob.routeID, this.state.routerListWithAllAttrib) });
        }
        //console.log(newArray);
        return newArray;
    }

    findRelatedStation = (id) => {
        return this.state.stationList.find((el) => el.id === id);
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
                            <th>Bus Name</th>
                            <th>Route</th>
                            <th>Registration Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.busListWithAllAttribb.map((bus) => {
                            return (<tr key={bus.id}>
                                <td>{bus.name}</td>
                            <td>{bus.routeID.routeNumber}/{bus.routeID.destination1.stationName}-{bus.routeID.destination2.stationName}</td>
                                <td>{bus.numberPlate}</td>
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

export default BusList;