const initialState = {
    user: []
}

export const getTransactionsForGroupReducer = (state = initialState, action) => {
    // console.log(action.payload)
    switch (action.type) {
        case 'GETTRANSACTIONSFORGROUP':
            return { ...state, user: action.payload }

        default:
            return state

    }
}