// File: app/api/comments/route.ts
import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  try {
    const comments = await redis.lrange(`comments:${slug}`, 0, -1);
    const parsedComments = comments
      .map((comment) => {
        if (typeof comment === 'object' && comment !== null) {
          // If it's already an object, return it as is
          return comment;
        } else if (typeof comment === 'string') {
          try {
            // If it's a string, try to parse it as JSON
            return JSON.parse(comment);
          } catch (error) {
            console.error('Error parsing comment:', comment, error);
            return null;
          }
        } else {
          console.error('Unexpected comment type:', typeof comment);
          return null;
        }
      })
      .filter((comment) => comment !== null);

    return NextResponse.json(parsedComments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { slug, name, comment } = await request.json();

    if (!slug || !name || !comment) {
      return NextResponse.json({ error: 'Slug, name, and comment are required' }, { status: 400 });
    }

    const id = Date.now().toString();
    const newComment = { id, name, comment, createdAt: new Date().toISOString() };
    // Store the comment as an object, not as a JSON string
    await redis.lpush(`comments:${slug}`, newComment);

    return NextResponse.json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
  }
}
