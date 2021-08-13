import React, {useContext, useEffect} from 'react';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';

import Title from './Title';
import {GlobalContext} from "../../context/GlobalState";
import '../../App.css';


function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function Orders() {

    const context = useContext(GlobalContext);
    const {transactions, getTransactions, deleteTransaction} = context;
    useEffect(() => {
        getTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>History</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Action</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Payment Method</TableCell>
                        <TableCell>Comment</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((row) => (
                        <TableRow key={row._id} className={"lol"}
                                  style={row.amount < 0
                                      ? {borderRight: "5px solid #c0392b"}
                                      : {borderRight: "5px solid #2ecc71"}}>
                            <TableCell>{
                                <button
                                    className='delete-btn'
                                    onClick={() => deleteTransaction(row._id)}>
                                    <DeleteIcon/>
                                </button>}
                            </TableCell>
                            <TableCell>{row.createdAt.toString().slice(0, 10)}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell
                                style={row.amount < 0 ?
                                    {color: "red"}
                                    : {color: "green"}}>
                                {row.amount}₪</TableCell>
                            <TableCell>{"VISA ⠀•••• 5919"}</TableCell>
                            <TableCell
                                style={{wordBreak: "break-word"}}>
                                {row.comment}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}>
                <Link color="primary" href="#" onClick={preventDefault}>
                    See Orders in details
                </Link>
            </div>
        </React.Fragment>
    );
}