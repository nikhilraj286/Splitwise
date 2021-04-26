const initialState = {
    user: []
}

export const deleteCommentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DELETECOMMENT':
            return { ...state, user: action.payload }

        default:
            return state

    }
}