const initialState = null;

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data.message;
        case 'REMOVE_NOTIFICATION':
            return initialState;
        default:
            return state;
    }
};

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: { message }
        });

        setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICATION'
            });
        }, time * 1000);
    };
};

export default notificationReducer;