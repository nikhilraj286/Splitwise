const initialState = {
    user: []
}

export const getGroupDataReducer = (state = initialState, action) => {
    // console.log(action.payload)
    switch (action.type) {
        case 'GETGROUPDATA':
            return { ...state, user: action.payload }

        default:
            return state

    }
}