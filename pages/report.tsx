import type { GetStaticProps, NextPage } from 'next';
import useSWR from 'swr';

import styles from '../styles/Home.module.css';
import prisma from '../lib/prisma';
import fetcher from '../lib/fetcher';
import Head from '../components/Layout/Head';
import Layout from '../components/Report/Layout';
import { fullCheckIn } from '../components/Report/types';

const Report: NextPage<{
  checkIns: fullCheckIn[];
}> = ({ checkIns }) => {
  const {
    data,
    mutate: refresh,
    isValidating,
  } = useSWR('/api/getCheckIns', fetcher, {
    fallbackData: checkIns,
    refreshInterval: 60000,
  });

  return (
    <div className={styles.container}>
      <Head title="Report" description="Report for Covid Check-in" />

      <Layout
        initialCheckIns={data}
        refresh={refresh}
        refreshing={isValidating}
      />
    </div>
  );
};

export default Report;

export const getStaticProps: GetStaticProps = async () => {
  const checkIns = await prisma.checkIn.findMany({
    include: { user: true, location: true },
  });
  // Revalidate each minute
  return { props: { checkIns }, revalidate: 1 * 60 };
};
