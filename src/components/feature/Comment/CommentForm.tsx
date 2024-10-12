'use client';

import { useState } from 'react';

interface CommentFormProps {
  slug: string;
  onCommentAdded: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ slug, onCommentAdded }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, name, comment }),
    });

    if (response.ok) {
      onCommentAdded();
      setName('');
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        className="mb-2 w-full rounded-md bg-gray-700 p-2"
        required
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Your Comment"
        className="mb-2 w-full rounded-md bg-gray-700 p-2"
        required
      ></textarea>
      <button type="submit" className="rounded-md bg-teal-500 px-4 py-2 text-white">
        Submit Comment
      </button>
    </form>
  );
};

export default CommentForm;
