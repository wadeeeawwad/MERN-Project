import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

const Alert = () => {
    const { alerts } = useContext(GlobalContext);
    return (
        alerts.length > 0 &&
        alerts.map(alert => (
            <div key={alert.id} style={{color: "red" , textAlign: "center", fontSize : "20px"  }}>
                {alert.msg}
            </div>
        ))
    );
};

export default Alert;
