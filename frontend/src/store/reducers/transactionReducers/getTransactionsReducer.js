const initialState = {
    user: []
}

export const getTransactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GETTRANSACTIONS':
            return { ...state, user: action.payload }

        default:
            return state

    }
}