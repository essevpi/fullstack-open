import { React, useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ logUser }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        logUser(username, password);
        setUsername('');
        setPassword('');
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label>Username: </label>
                <input
                    type='text'
                    value={username}
                    name="Username"
                    onChange={handleUsernameChange}
                />
            </div>
            <div>
                <label>Password: </label>
                <input
                    type='password'
                    value={password}
                    name="Password"
                    onChange={handlePasswordChange}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

LoginForm.propTypes = {
    logUser: PropTypes.func.isRequired
};

export default LoginForm;
