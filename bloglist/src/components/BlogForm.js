import React from 'react';

const BlogForm = ({ blogTitle, blogAuthor, blogUrl, setBlogTitle, setBlogAuthor, setBlogUrl, handleCreateBlog }) => {
    return (
        <form onSubmit={handleCreateBlog} className="BlogForm">
            <p>Add a new blog</p>
            <div className="BlogField">
                <label>Title: </label>
                <input 
                    type="text" 
                    value={blogTitle} 
                    onChange={({ target }) => setBlogTitle(target.value)}
                />
            </div>
            <div className="BlogField">
                <label>Author: </label>
                <input 
                    type="text" 
                    value={blogAuthor} 
                    onChange={({ target }) => setBlogAuthor(target.value)}
                />
            </div>
            <div className="BlogField">
                <label>URL: </label>
                <input 
                    type="text" 
                    value={blogUrl} 
                    onChange={({ target }) => setBlogUrl(target.value)}
                />
            </div>
            <button type="submit">Create Blog</button>
        </form>
    );
};

export default BlogForm;
