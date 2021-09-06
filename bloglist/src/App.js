import { React, useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import blogService from "./services/blogs";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Navbar from "./components/Navbar";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [blogTitle, setBlogTitle] = useState('');
    const [blogAuthor, setBlogAuthor] = useState('');
    const [blogUrl, setBlogUrl] = useState('');
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState(null);

    useEffect(() => {
        const setAllBlogs = async () => {
            try {
                const blogs = await blogService.getAllBlogs();
                setBlogs(blogs);
            } catch (exception) {
                console.log(exception);
            }
        }
        if (user) {
            setAllBlogs();
        }
    }, [user]);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('bloglistLoggedUser');
        if (loggedUserJSON) {
            const loggedUser = JSON.parse(loggedUserJSON);
            setUser(loggedUser);
            blogService.setToken(loggedUser.token);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const user = await loginService.logIn({username, password});
            window.localStorage.setItem('bloglistLoggedUser', JSON.stringify(user));
            blogService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');
            setNotificationMessage(`${user.username} sucessfully logged in`);
            setNotificationType('Success');
        } catch (exception) {
            setNotificationMessage(`Could not log in: ${exception.response.data.error}`);
            setNotificationType('Error');
        }
        setTimeout(() => {
            setNotificationMessage(null);
        }, 5000);
    };

    const handleLogout = () => {
        window.localStorage.removeItem('bloglistLoggedUser');
        setUser(null);
    };

    const handleCreateBlog = async (e) => {
        e.preventDefault();

        try {
            const newBlog = {
                title: blogTitle,
                author: blogAuthor,
                url: blogUrl
            }

            const savedBlog = await blogService.create(newBlog);
            setBlogs(blogs.concat(savedBlog));
            setBlogTitle('');
            setBlogAuthor('');
            setBlogUrl('');
            setNotificationMessage(`'${blogs.title}' sucessfully added to blogs`);
            setNotificationType('Success');
        } catch (exception) {
            setNotificationMessage(`Cannot add this blog: ${exception.response.data.error}`);
            setNotificationType('Error');
        }
        setTimeout(() => {
            setNotificationMessage(null);
        }, 5000);
    };

    return (
    <div className="App">
        <Navbar user={user} handleLogout={handleLogout} />
        <div className="MainContent"> 
            {user === null ?
                <div>
                    <Notification type={notificationType} message={notificationMessage} />
                    <LoginForm 
                        username={username}
                        password={password}
                        setUsername={setUsername}
                        setPassword={setPassword}
                        handleLogin={handleLogin}
                    />
                </div> :
                <div className="BlogsContent">
                    <BlogList blogs={blogs} />
                    <Notification type={notificationType} message={notificationMessage} />
                    <BlogForm  
                        blogTitle={blogTitle}
                        blogAuthor={blogAuthor}
                        blogUrl={blogUrl}
                        setBlogAuthor={setBlogAuthor}
                        setBlogTitle={setBlogTitle}
                        setBlogUrl={setBlogUrl}
                        handleCreateBlog={handleCreateBlog}
                    />
                </div>
            } 
        </div>
    </div>
    );
};

export default App;
