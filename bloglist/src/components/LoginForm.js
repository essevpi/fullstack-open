import React from 'react';

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
    return (
        <form onSubmit={handleLogin} className="LoginForm">
            <div className="LoginField">
                <label>Username</label>
                <input 
                    type="text" 
                    value={username}
                    onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div className="LoginField">
                <label>Password</label>
                <input 
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button type="submit">Log In</button>
        </form>
    );
};

export default LoginForm;
