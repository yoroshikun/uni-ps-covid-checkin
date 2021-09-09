import type { GetServerSideProps, NextPage } from 'next';
import { Location } from '@prisma/client';

import prisma from '../lib/prisma';
import CheckInForm from '../components/Form/CheckInForm';
import Head from '../components/Layout/Head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import humanImage from '../public/Human.png';

const Home: NextPage<{ locations: Location[] }> = ({ locations }) => {
  return (
    <div>
      <div className={styles.leftWindow}>
        <p className={styles.line1}>Welcome to</p>
        <p className={styles.line2}>COVID CHECK-IN</p>
        <p className={styles.line3}>Check-in your location</p>

        <div className={styles.human}>
          <Image
            src={humanImage}
            alt="Human Illustration"
            height={400}
            width={250}
          />
        </div>
      </div>
      <div className={styles.topWindow}></div>
      <div className={styles.container}>
        <Head
          title="Covid Check-in Terminal"
          description="Check in with ease with this Terminal"
        />

        <CheckInForm locations={locations} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const locations = await prisma.location.findMany();
  return { props: { locations } };
};

export default Home;
