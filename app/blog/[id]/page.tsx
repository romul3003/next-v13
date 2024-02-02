import { getAllPosts, getPostById } from '@/services/getPosts';
import { Metadata } from 'next';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

export const generateStaticParams = async () => {
  const posts: any[] = await getAllPosts();

  return posts.map((post) => ({
    slug: post.id.toString(),
  }));
};

export const generateMetadata = async ({ params: { id } }: Props): Promise<Metadata> => {
  const post = await getPostById(id);

  return {
    title: post.title,
  };
};

async function removePost(id: string) {
  'use server';
  await fetch(`http://localhost:3300/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  revalidatePath('/blog');
  redirect('/blog');
}

const Post = async ({ params: { id } }: Props) => {
  const post = await getPostById(id);

  return (
    <div className="container">
      <h1>{post.title}</h1>
      <p>{post.body}</p>

      <form action={removePost.bind(null, id)} style={{ marginBlock: '1rem' }}>
        <input type="submit" value="delete post" />
      </form>

      <div style={{ textAlign: 'center' }}>
        <Link href={`/blog/${id}/edit`}>Edit</Link>
      </div>
    </div>
  );
};

export default Post;
