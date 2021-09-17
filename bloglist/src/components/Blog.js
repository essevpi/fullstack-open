import React, { useState } from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const Blog = ({ blog, user, addLike, removeBlog }) => {
    const [contentVisible, setContentVisible] = useState(false);

    const showContent = { display: contentVisible ? '' : 'none' };

    const toggleContentVisibility = () => {
        setContentVisible(!contentVisible);
    };

    const updateLikes = () => {
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1
        };
        addLike(updatedBlog);
    };

    return (
        <div className="Blog">
            <div className="BlogHeading">
                <div className="BlogTitle">
                    <em>{blog.title}</em>
                </div>
                <div className="BlogAuthor">
                    {blog.author}
                </div>

                <button className="BlogViewBtn" onClick={toggleContentVisibility}>
                    {contentVisible ? 'Hide' : 'View'}
                </button>
            </div>

            <div className="BlogTogglableContent" style={showContent}>
                <div className="BlogUrl">
                    <a href="#">
                        {blog.url}
                    </a>
                </div>

                <div>
                    Posted By  {blog.user.name}
                </div>

                <div className="RemoveBlogBtn">
                    {
                        user !== null && user.username === blog.user.username &&
                        <button onClick={() => removeBlog(blog)}>Remove</button>
                    }
                </div>

                <div className="BlogLikes">
                    {blog.likes} likes
                    <button className="BlogLikeBtn" onClick={updateLikes}><ThumbUpIcon style={{ fontSize: '1rem' }}/></button>
                </div>
            </div>
        </div>
    );
};

export default Blog;
