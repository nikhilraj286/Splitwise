const initialState = {
    user: []
}

export const settleupReducer = (state = initialState, action) => {
    // console.log(action.payload)
    switch (action.type) {
        case 'SETTLEUP':
            return { ...state, user: action.payload }

        default:
            return state

    }
}