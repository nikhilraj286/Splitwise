const initialState = {
    user: []
}

export const getTransactionsForUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GETTRANSACTIONSFORUSER':
            return { ...state, user: action.payload }

        default:
            return state

    }
}