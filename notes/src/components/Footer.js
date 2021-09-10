import React from 'react';

const Footer = () => {
    const footerStyle = {
        color: '#AAAAFF',
        fontStyle: 'italic',
        fontSize: 12,
        textAlign: 'center'
    };

    return (
        <div style={footerStyle}>
            <br />
            <em>Note app - Fullstack Open 2021</em>
        </div>
    );
};

export default Footer;
