const initialState = {
    user: []
}

export const getGroupsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GETGROUPS':
            return { ...state, user: action.payload }

        default:
            return state

    }
}