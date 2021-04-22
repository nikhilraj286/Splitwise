const initialState = {
    user: []
}

export const deleteUserFromGroupReducer = (state = initialState, action) => {
    // console.log(action.payload)
    switch (action.type) {
        case 'DELETEUSERFROMGROUP':
            return { ...state, user: action.payload }

        default:
            return state

    }
}