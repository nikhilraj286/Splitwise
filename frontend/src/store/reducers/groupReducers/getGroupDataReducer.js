const initialState = {
    user: []
}

export const getGroupDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GETGROUPDATA':
            return { ...state, user: action.payload }

        default:
            return state

    }
}