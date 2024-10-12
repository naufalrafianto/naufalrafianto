'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

interface Comment {
  id: string;
  name: string;
  comment: string;
  createdAt: string;
}

interface CommentSectionProps {
  slug: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ slug }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const router = useRouter();

  const fetchComments = async () => {
    const response = await fetch(`/api/comments?slug=${slug}`);
    if (response.ok) {
      const data = await response.json();
      setComments(data);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [slug]);

  const handleCommentAdded = () => {
    fetchComments();
    router.refresh();
  };

  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="mb-4 text-3xl font-bold">Leave a Comment</h2>
      <CommentForm slug={slug} onCommentAdded={handleCommentAdded} />
      <CommentList comments={comments} />
    </div>
  );
};

export default CommentSection;
