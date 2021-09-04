import type { GetStaticProps, NextPage } from 'next';
import type { CheckIn } from '@prisma/client';

import styles from '../styles/Home.module.css';
import prisma from '../lib/prisma';
import Head from '../components/Layout/Head';

const Report: NextPage<{ feed: CheckIn[] }> = ({ feed }) => {
  return (
    <div className={styles.container}>
      <Head title="Report" description="Report for Covid Check-in" />

      <h1>Check in Report</h1>

      <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        {feed.map((item) => (
          <div
            key={item.id}
            style={{
              padding: '1rem',
              border: '1px solid black',
              borderRadius: '1rem',
              marginBottom: '1rem',
            }}
          >
            <h2>UserId: {item.userId}</h2>
            <h3>location: {item.location}</h3>
            <p>time: {item.timestamp.toString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Report;

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.checkIn.findMany();
  // Revalidate each minute
  return { props: { feed }, revalidate: 1 * 60 };
};
