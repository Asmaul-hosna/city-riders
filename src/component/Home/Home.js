import React, { useEffect, useState } from 'react';
import Destination from '../Destination/Destination';

import destinationData from '../fakeData/fakeData.json';




const Home = () => {
     const [destinations,setdestinations]=useState([])

     useEffect(()=>{
       setdestinations(destinationData);
      
     },[])
 
    return (
        <div>
         
          
          {
            destinations.map(destination =><Destination destination={destination} key={destination.ipNumber}></Destination>)
          }
         
          
        </div>
    );
};

export default Home;