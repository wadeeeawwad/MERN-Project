import React, {useContext, useEffect} from 'react';
import {GlobalContext} from '../../context/GlobalState';
import TransactionList from '../transactions/TransactionList';
import AddTransaction from '../transactions/AddTransaction';
import Dashboard from "../dashboard/Dashboard";

const Home = () => {
    const {loadUser} = useContext(GlobalContext);

    useEffect(() => {
        loadUser();

        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Dashboard/>
        </>
    );
};

export default Home;
