import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
    const style = {
        border: 'solid',
        padding: '0.75rem',
        borderWidth: '1px',
        textAlign: 'center'
    };

    const notification = useSelector(state => state.notification);

    if (!notification) {
        return null;
    }

    return (
        <div style={style}>
            {notification}
        </div>
    );
};

export default Notification;