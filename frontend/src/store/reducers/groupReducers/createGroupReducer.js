const initialState = {
    user: []
}

export const CreateGroupReducer = (state = initialState, action) => {
    // console.log(action.payload)
    switch (action.type) {
        case 'CREATEGROUP':
            return { ...state, user: action.payload }

        default:
            return state

    }
}