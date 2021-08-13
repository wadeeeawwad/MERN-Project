import React, {useContext} from 'react';
import {useTheme} from '@material-ui/core/styles';
import {LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer} from 'recharts';
import Title from './Title';
import {GlobalContext} from "../../context/GlobalState";

// Generate Sales Data
function createData(time, amount) {
    return {time, amount};
}

function createDate(daysConsumption) {
    return [
        createData('Saturday', daysConsumption[6]),
        createData('Sunday', daysConsumption[0]),
        createData('Monday', daysConsumption[1]),
        createData('Tuesday', daysConsumption[2]),
        createData('Wednesday', daysConsumption[3]),
        createData('Thursday', daysConsumption[4]),
        createData('Friday', daysConsumption[5]),
    ];
}

export default function Chart() {

    const theme = useTheme();
    const context = useContext(GlobalContext);
    let daysConsumption = [0, 0, 0, 0, 0, 0, 0]
    const {transactions} = context;
    const dates = transactions.map(transaction => ({
        date: new Date(transaction.createdAt).getDay(),
        amount: transaction.amount
    }));
    dates.map((item) => daysConsumption[item.date] += item.amount);

    return (
        <React.Fragment>
            <Title>This Week</Title>
            <ResponsiveContainer>
                <LineChart
                    data={createDate(daysConsumption)}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey="time" stroke={theme.palette.text.secondary}/>
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label
                            angle={270}
                            position="left"
                            style={{textAnchor: 'middle', fill: theme.palette.text.primary}}
                        >
                            Consumption ($)
                        </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false}/>
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}