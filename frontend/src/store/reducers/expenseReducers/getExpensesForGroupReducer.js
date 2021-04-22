const initialState = {
    user: []
}

export const getExpensesForGroupReducer = (state = initialState, action) => {
    // console.log(action.payload)
    switch (action.type) {
        case 'GETEXPENSESFORGROUP':
            return { ...state, user: action.payload }

        default:
            return state

    }
}