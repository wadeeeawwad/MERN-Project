import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

const Alert = () => {
    const { alerts } = useContext(GlobalContext); // Import the alert state from the Context named Global context in Context folder
    return (
        alerts.length > 0 &&  // If there is and alert this Compoennt will have a body
        alerts.map(alert => ( // Create an Error with Every Entry in the alert state array
            <div key={alert.id} style={{color: "red" , textAlign: "center", fontSize : "20px"  }}>
                {alert.msg}
            </div>
        ))
    );
};

export default Alert;
