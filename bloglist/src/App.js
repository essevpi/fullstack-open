import React, { useState, useEffect, useRef } from 'react';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import blogService from './services/blogs';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Navbar from './components/Navbar';
import Togglable from './components/Togglable';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState(null);

    const blogFormRef = useRef();

    useEffect(() => {
        const setAllBlogs = async () => {
            try {
                const blogs = await blogService.getAllBlogs();
                setBlogs(blogs);
            } catch (exception) {
                console.log(exception);
            }
        };
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

    const handleLogin = async (username, password) => {
        try {
            const user = await loginService.logIn({ username, password });
            window.localStorage.setItem('bloglistLoggedUser', JSON.stringify(user));
            blogService.setToken(user.token);
            setUser(user);

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

    const createBlog = async (blogObject) => {
        try {
            const savedBlog = await blogService.create(blogObject);
            blogFormRef.current.toggleVisibility();
            setBlogs(blogs.concat(savedBlog));
            setNotificationMessage(`'${savedBlog.title}' sucessfully added to blogs`);
            setNotificationType('Success');
        } catch (exception) {
            setNotificationMessage(`Cannot add this blog: ${exception.response.data.error}`);
            setNotificationType('Error');
        }
        setTimeout(() => {
            setNotificationMessage(null);
        }, 5000);
    };

    const removeBlog = async (blogToRemove) => {
        if (window.confirm(`Are you sure you want to remove '${blogToRemove.title}'?`)) {
            try {
                await blogService.remove(blogToRemove);
                setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id));
                setNotificationMessage(`'${blogToRemove.title}' sucessfully removed from blogs`);
                setNotificationType('Success');
            } catch (exception) {
                setNotificationMessage(`Cannot remove this blog: ${exception.response.data.error}`);
                setNotificationType('Error');
            }
            setTimeout(() => {
                setNotificationMessage(null);
            }, 5000);
        }
    };

    const addLike = async (blogToUpdate) => {
        try {
            const updatedBlog = await blogService.update(blogToUpdate);
            setBlogs(blogs.map(blog => blog.id !== blogToUpdate.id ? blog : updatedBlog));
        } catch (exception) {
            //error
        }
    };

    return (
        <div className="App">
            <Navbar user={user} handleLogout={handleLogout} />
            <div className="MainContent">
                {user === null ?
                    <div>
                        <Notification type={notificationType} message={notificationMessage} />
                        <div>
                            <h2>Welcome to Bloglist!</h2>
                            <p>Login to start browsing blogs</p>
                        </div>
                        <Togglable buttonLabel="Log in">
                            <LoginForm
                                handleLogin={handleLogin}
                            />
                        </Togglable>
                    </div> :
                    <div className="BlogsContent">
                        <BlogList
                            blogs={blogs}
                            user={user}
                            addLike={addLike}
                            removeBlog={removeBlog}
                        />
                        <Notification type={notificationType} message={notificationMessage} />
                        <Togglable buttonLabel="Create blog" ref={blogFormRef}>
                            <BlogForm
                                createBlog={createBlog}
                            />
                        </Togglable>
                    </div>
                }
            </div>
        </div>
    );
};

export default App;
