"use client";

const Error = ({ error }: { error: Error }) => {
  return <h1>Oops!! {error.message}</h1>;
};

export default Error;
