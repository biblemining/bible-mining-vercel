import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BlogPage.css';

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://bible-mining-backend.onrender.com');
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("పోస్ట్‌లను లోడ్ చేయడంలో లోపం సంభవించింది.");
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="blog-container">లోడ్ అవుతోంది...</div>;
  }

  if (error) {
    return <div className="blog-container error-message">{error}</div>;
  }

  return (
    <div className="blog-container">
      <h2>తాజా అప్‌డేట్‌లు & ఈవెంట్‌లు</h2>
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post._id} className="blog-post-card">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-meta">పోస్ట్ చేసినవారు: {post.author} | తేదీ: {new Date(post.createdAt).toLocaleDateString()}</p>
            <p className="post-content">{post.content}</p>
          </div>
        ))
      ) : (
        <p className="no-posts-found">ఇప్పటివరకు ఎటువంటి పోస్ట్‌లు లేవు.</p>
      )}
    </div>
  );
}

export default BlogPage;