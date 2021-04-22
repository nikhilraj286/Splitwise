const initialState = {
    user: []
}

export const getTransactionsReducer = (state = initialState, action) => {
    // console.log(action.payload)
    switch (action.type) {
        case 'GETTRANSACTIONS':
            return { ...state, user: action.payload }

        default:
            return state

    }
}