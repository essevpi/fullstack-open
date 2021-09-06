import React from 'react';

const Blog = ({ blog }) => {
    return (
        <div className="Blog">
            <div className="BlogTitle">
                <em>{blog.title}</em>
            </div>
            <a href="#">
                {blog.url}
            </a>
            <div className="BlogDesc">
                <div className="BlogAuthor">
                    {blog.author}
                </div>
                <div className="BlogLikes">
                    {blog.likes} likes
                </div>
            </div>            
        </div>
    );
};

export default Blog;
