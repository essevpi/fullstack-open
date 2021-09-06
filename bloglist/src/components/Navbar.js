import React from 'react';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const Navbar = ({ user, handleLogout }) => {
    return (
        <div className="NavContainer">
            <div className="NavLeftHalf">
                <div className="NavHeader">
                    <MenuBookIcon className="NavLogo" />
                    <p className="NavTitle">Bloglist</p>
                </div>
            </div>
            <div className="NavRightHalf">
                {
                    user === null 
                    ? null
                    : <div className="NavUser">
                        <p>{user.name}</p>
                        <button onClick={handleLogout}>Log Out</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar
