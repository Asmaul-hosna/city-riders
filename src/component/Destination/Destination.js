import React from 'react';
import { Link } from 'react-router-dom';



const Destination = (props) => {
const {title,image}=props.destination;
const rideStyle={
    float:'left',
    display:'flex',
    border:'box-shadow',
    width:'250px',
    padding:'5px',
    margin:'5px'

}


    return (
        <div style={rideStyle}>
            <div className="ride-container">
            <img style={{height:'100px'}} src={image} alt=""></img>
             <h2> <Link to="/serviceArea">{title}</Link></h2>
        </div>
       
        </div>
    );
};

export default Destination;