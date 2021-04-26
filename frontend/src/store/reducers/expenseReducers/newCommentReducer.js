const initialState = {
    user: []
}

export const newCommentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEWCOMMENT':
            return { ...state, user: action.payload }

        default:
            return state

    }
}