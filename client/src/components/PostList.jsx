import React from 'react';

const PostList = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p className="text-gray-500 mt-4">No posts yet.</p>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-4">
      {posts.map(post => (
        <div key={post._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
          <p className="text-gray-600 mt-2 line-clamp-3">{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
