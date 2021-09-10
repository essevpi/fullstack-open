import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);

    const showWhenVisible = { display: visible ? '' : 'none' };
    const hideWhenVisible = { display: visible ? 'none' : '' };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        };
    });

    return (
        <div style={{ width: '100%' }}>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>
                    {props.buttonLabel}
                </button>
            </div>
            <div style={showWhenVisible}>
                <div className="TogglableModal">
                    {props.buttonLabel}
                    <button onClick={toggleVisibility} className="CancelBtn">Cancel</button>
                </div>
                {props.children}
            </div>
        </div>
    );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
};

export default Togglable;
