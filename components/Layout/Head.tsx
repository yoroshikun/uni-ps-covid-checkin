import NextHead from 'next/head';

interface HeadProps {
  title: string;
  description: string;
}

const Head = ({ title, description }: HeadProps) => (
  <NextHead>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" href="/favicon.ico" />
    {/* no index */}
    <meta name="robots" content="noindex" />
  </NextHead>
);

export default Head;
