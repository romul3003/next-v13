import { getAllPosts, getPostById } from '@/services/getPosts';
import { Metadata } from 'next';

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

const Post = async ({ params: { id } }: Props) => {
  const post = await getPostById(id);

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  );
};

export default Post;
