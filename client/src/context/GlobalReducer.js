/* eslint-disable import/no-anonymous-default-export */
export default (state, action) => {
    switch (action.type) {
        case 'USER_LOADED':
            return { // If its a get user then change that state
                ...state,
                user: action.payload,
                loading: false,
                isAuthenticated: true
            };
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return { // if item is logged in then change the loged in state
                ...state,
                isAuthenticated: true,
                token: action.payload,
                loading: false
            };
        case 'REGISTER_ERROR':
        case 'AUTH_ERROR':
        case 'LOGOUT':
            localStorage.removeItem('token');
            return { // if logout then change the loged in state and other states
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                error: action.payload,
                loading: false,
                transactions: []
            };
        case 'REMOVE_ERROR':
            return { // if timer up then change the error state and rerender (Error disappering)
                ...state,
                error: null
            };
        case 'GET_TRANSACTIONS': // if its a transaction get then change transaction state
            return {
                ...state,
                loading: false,
                transactions: action.payload
            };
        case 'ADD_TRANSACTION':
            return {
                ...state, // chage transaction state 
                transactions: [action.payload, ...state.transactions],
                loading: false
            };
        case 'DELETE_TRANSACTION':
            return {
                ...state, // delete transaction
                transactions: state.transactions.filter(
                    transaction => transaction._id !== action.payload
                ),
                loading: false
            };

        case 'TRANSACTION_ERROR':
            return {
                ...state,
                error: action.payload
            };

        // case 'ADD_CHECK':
        //     return {
        //         ...state, // chage transaction state
        //         transactions: [action.payload, ...state.transactions],
        //         loading: false
        //     };

        case 'CHECK_ERROR':
            return {
                ...state,
                error: action.payload
            };

        case 'SET_ALERT':
            return {
                ...state,
                alerts: [...state.alerts, action.payload]
            };

        case 'REMOVE_ALERT':
            return {
                ...state,
                alerts: state.alerts.filter(
                    alert => alert.id !== action.payload
                )
            };
        default:
            return state;
    }
};
