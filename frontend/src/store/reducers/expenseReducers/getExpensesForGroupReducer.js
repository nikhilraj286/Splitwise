const initialState = {
    user: []
}

export const getExpensesForGroupReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GETEXPENSESFORGROUP':
            return { ...state, user: action.payload }

        default:
            return state

    }
}