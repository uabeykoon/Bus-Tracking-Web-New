import React from 'react';

const SingleDateSheduleChart = (props) => {
    return (
        <>
            <h4>From {props.destination}</h4><br />
            <table id="customers">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Bus</th>
                        <th>Update Bus</th>
                    </tr>
                </thead>
                <tbody>
                    {props.timeList.map((time) => {
                        return (<tr key={time.id}>
                            <td>{time.departureTime}</td>
                            <td>
                                <select className="form-control" onChange={(e) => props.onChangeBus(time.id, e)}>
                                    <option key={0} value={time.shedule.busID}>{findRelatedBusName(time.shedule.busID,props.busList)}</option>
                                    {props.busList.map((bus) => {
                                        return (
                                        <option key={bus.id} value={bus.id}>{bus.name} - {bus.numberPlate}</option>
                                        );
                                    })}

                                </select>
                            </td>
                            <td><button className="btn btn-primary" disabled={time.buttonDisable} onClick={props.onClickUpdate}>Update</button></td>
                        </tr>);
                    })}
                </tbody>
            </table>
        </>
    );
}

const findRelatedBusName = (id, array) => {
    //return array.find((el) => el.id === id).id;
    let s = array.find((a)=>a.id===id);
    if(typeof(s)==="undefined"){
        return "No Bus Assigned"
    }else{
        return `${s.name} - ${s.numberPlate}`;
    }
    console.log(id);
    console.log(s);
    return "id + "  + "rray";
}

export default SingleDateSheduleChart;