const initialState = {
    user: []
}

export const newCommentReducer = (state = initialState, action) => {
    // console.log(action.payload)
    switch (action.type) {
        case 'NEWCOMMENT':
            return { ...state, user: action.payload }

        default:
            return state

    }
}