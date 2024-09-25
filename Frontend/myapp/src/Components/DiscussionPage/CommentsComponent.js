import React, { useState } from 'react';

const CommentsComponent = ({ comments, deleteComment, editComment, user }) => {
  return (
    <div className='font-playfair'>
      <h2 className="text-xl font-semibold mb-4 font-playfair">Comments</h2>
      <ul className="list-none p-0">
        {comments.map((comment) => {
          const isUserComment = comment.user_id === user;
          return (
            <li
              key={comment._id}
              className={`flex mb-4 ${isUserComment ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  isUserComment ? 'bg-blue-100 text-right' : 'bg-red-100 text-left'
                }`}
              >
                <div>
                  <strong>{comment.user_id}</strong>: {comment.content}
                  <span className="text-xs text-gray-500 ml-2">{new Date(comment.time).toLocaleString()}</span>
                </div>
                {isUserComment && (
                  <div className="mt-2">
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => deleteComment(comment._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="text-blue-500 hover:underline ml-2"
                      onClick={() => editComment(comment._id, comment.content)}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CommentsComponent;
