import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
    const [blogTitle, setBlogTitle] = useState('');
    const [blogAuthor, setBlogAuthor] = useState('');
    const [blogUrl, setBlogUrl] = useState('');

    const handleBlogTitleChange = (e) => {
        setBlogTitle(e.target.value);
    };

    const handleBlogAuthorChange = (e) => {
        setBlogAuthor(e.target.value);
    };

    const handleBlogUrlChange = (e) => {
        setBlogUrl(e.target.value);
    };

    const handleBlogSubmit = (e) => {
        e.preventDefault();

        createBlog({
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl
        });

        setBlogTitle('');
        setBlogAuthor('');
        setBlogUrl('');
    };

    return (
        <form className="BlogForm" onSubmit={handleBlogSubmit}>
            <div className="BlogField">
                <label>Title: </label>
                <input
                    type="text"
                    value={blogTitle}
                    onChange={handleBlogTitleChange}
                />
            </div>
            <div className="BlogField">
                <label>Author: </label>
                <input
                    type="text"
                    value={blogAuthor}
                    onChange={handleBlogAuthorChange}
                />
            </div>
            <div className="BlogField">
                <label>URL: </label>
                <input
                    type="text"
                    value={blogUrl}
                    onChange={handleBlogUrlChange}
                />
            </div>
            <button type="submit">Create Blog</button>
        </form>
    );
};

export default BlogForm;
