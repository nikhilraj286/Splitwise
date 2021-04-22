const initialState = {
    user: []
}

export const deleteCommentReducer = (state = initialState, action) => {
    // console.log(action.payload)
    switch (action.type) {
        case 'DELETECOMMENT':
            return { ...state, user: action.payload }

        default:
            return state

    }
}