import React, {useState, useContext} from "react";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {GlobalContext} from "../../context/GlobalState";
import {makeStyles} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const AddTransaction = () => {
    const context = useContext(GlobalContext);
    const classes = useStyles();

    const {addTransaction, addCheck} = context;
    const [text, setText] = useState("");
    const [amount, setAmount] = useState(1);
    const [type, setType] = useState(1);
    const [comment, setComment] = useState("");
    const [check, setCheck] = useState(false);
    const [checkAmount, setCheckAmount] = useState(false);
    const [recipent, setRecipent] = useState("");
    const [dueDate, setDueDate] = useState(new Date());

    const handleDateChange = (date) => {
        setDueDate(date);
    };


    const handleChange = (event) => {
        setType(event.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const newTransaction = {
            id: Math.floor(Math.random() * 100000000),
            name: text,
            amount: type * amount,
            comment: comment,
        };

        const newCheck = {
            towhom: recipent,
            amount: checkAmount,
            duedate: dueDate,
        }

        if (check) {
            addCheck(newCheck);
            addTransaction({...newTransaction, amount: type * checkAmount});
        } else {
            addTransaction(newTransaction);
        }

        setText("");
        setAmount(0);
        setComment("");
        document.querySelector("input[type='text']").focus();
    };

    return (


        <>
            <h3>Add New Transaction</h3>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Transaction Name</label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter transaction..."
                        className="transaction-input"
                        required
                    />
                </div>

                <div className="form-control">
                    <label htmlFor="comment">Comment on Transaction</label>
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Enter your comments..."
                        className="transaction-input"
                        required
                    />
                </div>

                {!check && <div className="form-control">
                    <label htmlFor="amount">
                        Amount <br/>
                    </label>
                    <input
                        className="transaction-input"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount..."
                        required
                    />
                </div>}

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="type-native-helper">Type</InputLabel>
                    <NativeSelect
                        value={type}
                        onChange={handleChange}
                        inputProps={{
                            name: "type",
                            id: "type-native-helper",
                        }}
                    >
                        <option value={""} disabled hidden>
                            Choose Type
                        </option>
                        <option value={1}>Debit</option>
                        <option value={-1}>Credit</option>
                    </NativeSelect>
                    <FormHelperText>Choose Type of Transaction</FormHelperText>
                </FormControl>

                <FormControl component="fieldset">
                    <RadioGroup
                        row
                        aria-label="position"
                        name="checkorcash"
                        defaultValue="left"
                        required
                    >
                        <FormControlLabel
                            value={"cash"}
                            control={<Radio color="primary" required={true}/>}
                            label="Cash"
                            onChange={(e) => setCheck(false)}
                        />
                        <FormControlLabel
                            value={"check"}
                            control={<Radio color="primary" required={true}/>}
                            label="Check"
                            onChange={(e) => setCheck(true)}
                        />
                    </RadioGroup>
                </FormControl>

                {check && (
                    <div>
                        <div className="form-control">
                            <label htmlFor="checkamount">
                                Check Amount <br/>
                            </label>
                            <input
                                id={"checkamount"}
                                className="transaction-input"
                                type="number"
                                value={checkAmount}
                                onChange={(e) => setCheckAmount(e.target.value)}
                                placeholder="Enter amount..."
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label htmlFor="towho">
                                To Who <br/>
                            </label>
                            <input
                                className="transaction-input"
                                type="text"
                                id="towho"
                                value={recipent}
                                onChange={(e) => setRecipent(e.target.value)}
                                placeholder="Enter To whom this check is for..."
                                required
                            />
                        </div>

                        <div className="form-control">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    className="transaction-input"
                                    value={dueDate}
                                    onChange={handleDateChange}
                                    required
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Check Due date"
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>


                        </div>
                    </div>
                )}

                <button className="btn">ADD TRANSACTION</button>
            </form>
        </>
    );
};

export default AddTransaction;
