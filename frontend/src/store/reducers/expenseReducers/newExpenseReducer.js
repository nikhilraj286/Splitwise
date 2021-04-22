const initialState = {
    user: []
}

export const newExpenseReducer = (state = initialState, action) => {
    // console.log(action.payload)
    switch (action.type) {
        case 'NEWEXPENSE':
            return { ...state, user: action.payload }

        default:
            return state

    }
}