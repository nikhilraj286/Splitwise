const initialState = {
    user: []
}

export const getTransactionsForUserReducer = (state = initialState, action) => {
    // console.log(action.payload)
    switch (action.type) {
        case 'GETTRANSACTIONSFORUSER':
            return { ...state, user: action.payload }

        default:
            return state

    }
}