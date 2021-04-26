const initialState = {
    user: []
}

export const getTransactionsForGroupReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GETTRANSACTIONSFORGROUP':
            return { ...state, user: action.payload }

        default:
            return state

    }
}