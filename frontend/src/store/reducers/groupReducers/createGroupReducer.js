const initialState = {
    user: []
}

export const CreateGroupReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATEGROUP':
            return { ...state, user: action.payload }

        default:
            return state

    }
}