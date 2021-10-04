import type { GetServerSideProps, NextPage } from 'next';
import { Location } from '@prisma/client';
import { useState } from 'react';

import CheckInForm from '../components/Form/CheckInForm';
import LeftContainer from '../components/LeftContainer';
import Head from '../components/Layout/Head';
import prisma from '../lib/prisma';
import styles from '../styles/Home.module.css';

const UID: NextPage<{ locations: Location[] }> = ({ locations }) => {
  const [showDrop, setShowDropdown] = useState(false);

  return (
    <div className={styles.mainContainer}>
      <LeftContainer tkey="homepage" />

      <div className={styles.rightContainer}>
        <div className={styles.topWindow}></div>

        <Head
          title="Check-in with UID"
          description="Check in manually with UID"
        />
        <div className={styles.subContainer}>
          <CheckInForm locations={locations} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const locations = await prisma.location.findMany();
  return { props: { locations } };
};

export default UID;
