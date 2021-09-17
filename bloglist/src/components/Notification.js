import React from 'react';

const Notification = ({ type, message }) => {
    const notificationStyle = {
        color: type === 'Success' ? 'var(--theme-primary)' : '#dc0000',
        backgroundColor: '#2b2b2b',
        border: `1px solid ${type === 'Success' ? 'var(--theme-primary)' : '#dc0000'}`,
        borderRadius: '0.45rem',
        padding: '1rem',
        width: '50%',
        textAlign: 'center',
        margin: '1rem auto'
    };

    if (message === null) {
        return null;
    }

    return (
        <div style={notificationStyle} id="notification">
            {message}
        </div>
    );
};

export default Notification;
