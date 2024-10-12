import React from 'react';

interface Comment {
  id: string;
  name: string;
  comment: string;
  createdAt: string;
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="mt-8">
      <h3 className="mb-4 text-2xl font-bold">Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id} className="mb-4 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
          <p className="font-bold">{comment.name}</p>
          <p>{comment.comment}</p>
          <p className="mt-2 text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
