'use client';
import { FormEventHandler, useState } from 'react';
// import { usePosts } from '../store';
// import { shallow } from 'zustand/shallow';
import useSWR from 'swr';
import { getPostsBySearch } from '../services/getPosts';

const PostSearch = () => {
  const { mutate } = useSWR('posts');
  const [search, setSearch] = useState('');

  // const [getPostsBySearch] = usePosts((state) => [state.getPostsBySearch], shallow);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const posts = await getPostsBySearch(search);

    mutate(posts);
  };

  return (
    <form onSubmit={handleSubmit} className="searchForm">
      <input
        type="search"
        placeholder="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="searchInput"
      />
      <button type="submit" className="searchButton">
        Search
      </button>
    </form>
  );
};

export { PostSearch };
