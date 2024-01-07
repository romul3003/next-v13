import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav className="navigation">
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
};

export { Header };
