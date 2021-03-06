import React, { useState } from 'react';

const LoginForm = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        handleLogin(username, password);

        setUsername('');
        setPassword('');
    };

    return (
        <form onSubmit={handleLoginSubmit} className="LoginForm">
            <div className="LoginField">
                <label>Username</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={handleUsernameChange} />
            </div>
            <div className="LoginField">
                <label>Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange} />
            </div>
            <button type="submit" id="login-btn">Log In</button>
        </form>
    );
};

export default LoginForm;
