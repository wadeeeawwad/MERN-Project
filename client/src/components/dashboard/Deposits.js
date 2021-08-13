import React, {useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import {GlobalContext} from "../../context/GlobalState";
import {numberWithCommas} from "../../utils/format";
import IncomeExpenses from "../transactions/IncomeExpenses";

export default function Deposits() {
    const context = useContext(GlobalContext);
    const {transactions} = context;
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    return (
        <React.Fragment>
            <Title>Your Balance</Title>
            <Typography component="p" variant="h4" align={"center"}>
                {total < 0
                    ? '- ₪' + numberWithCommas(Math.abs(total))
                    : '₪' + numberWithCommas(total)}
            </Typography>
            <IncomeExpenses/>

        </React.Fragment>

    );
}