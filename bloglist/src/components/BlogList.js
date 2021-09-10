import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, user, addLike, removeBlog }) => {
    return (
        <div className="BlogList">
            {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    user={user}
                    addLike={addLike}
                    removeBlog={removeBlog}
                />)}
        </div>
    );
};

export default BlogList;
