import type { GetServerSideProps, NextPage } from 'next';
import { Location } from '@prisma/client';

import prisma from '../lib/prisma';
import CheckInForm from '../components/Form/CheckInForm';
import Head from '../components/Layout/Head';
import styles from '../styles/Home.module.css';

const Home: NextPage<{ locations: Location[] }> = ({ locations }) => {
  return (
    <div>
      <div className={styles.topFrame}></div>
      <div className={styles.container}>
        <Head
          title="Covid Check-in Terminal"
          description="Check in with ease with this Terminal"
        />

        <h1>Covid Check-in</h1>
        <CheckInForm locations={locations} />
      </div>
      <div className={styles.bottomFrame}></div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const locations = await prisma.location.findMany();
  return { props: { locations } };
};

export default Home;
